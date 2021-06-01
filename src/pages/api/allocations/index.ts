import { NextApiRequest, NextApiResponse } from 'next'

interface AllocationsApiHandlerApiRequest extends NextApiRequest {
  body: {
    allocation_amount: number
    investor_amounts: Array<{
      name: string
      requested_amount: number
      average_amount: number
    }>
  }
}

const AllocationsApiHandler = (
  { body: { allocation_amount, investor_amounts: investors } }: AllocationsApiHandlerApiRequest,
  res: NextApiResponse
) => {
  const calcs = {
    // The amount of the allocation that needs to be prorated
    amountOfAllocationUpForProration: null,

    // Max investment investors can make before requested investment needs to be prorated
    maxInvestorAllocationsBeforeProration: null,

    // Total average deal investment of all investors
    totalAverageInvestmentForProration: investors.reduce(
      (sum, { average_amount }) => sum + average_amount,
      0
    ),

    // Total requested investment of all investors
    totalRequestedAmount: investors.reduce((sum, { requested_amount }) => sum + requested_amount, 0),
  }

  calcs.maxInvestorAllocationsBeforeProration = investors.map(
    ({ average_amount }) => allocation_amount * (average_amount / calcs.totalAverageInvestmentForProration)
  )

  calcs.amountOfAllocationUpForProration = investors
    // Filter those investors who are requesting less than their average investment
    .filter(({ requested_amount }, i) => requested_amount <= calcs.maxInvestorAllocationsBeforeProration[i])
    .reduce((reducedAllocation, { average_amount, requested_amount }) => {
      // Since investing less than average, subtract the average from the total average of all investors
      calcs.totalAverageInvestmentForProration = calcs.totalAverageInvestmentForProration - average_amount

      // Subtract requested investment from allocation amount since will not need proration
      return reducedAllocation - requested_amount
    }, allocation_amount)

  // Calculate deal allocation, prorating investor investments as needed
  const proratedAllocation = Object.fromEntries(
    investors.map(({ name, requested_amount, average_amount }, i) => [
      name,
      // If investors are requesting to invest more than the allocation
      calcs.totalRequestedAmount > allocation_amount &&
      // If investor is requesting more than their average investment
      requested_amount > calcs.maxInvestorAllocationsBeforeProration[i]
        ? // Then prorate their investment for the portion of the deal that needs proration as a ratio average investment and all investor averages
          calcs.amountOfAllocationUpForProration * (average_amount / calcs.totalAverageInvestmentForProration)
        : // Else, allow requested investment
          requested_amount,
    ])
  )

  res.json(proratedAllocation)
}

export default AllocationsApiHandler
