import { AllocationState } from './hooks/reducers'

const serializeAllocationState = ({ totalAvailableAllocation, investors }: AllocationState) => ({
  allocation_amount: totalAvailableAllocation,
  investor_amounts: investors.map(({ name, investment: { historicalAverage, requesting } }) => ({
    name,
    average_amount: historicalAverage,
    requested_amount: requesting,
  })),
})

export { serializeAllocationState }
