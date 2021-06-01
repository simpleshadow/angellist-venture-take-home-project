import axios from 'axios'
import numbro from 'numbro'
import { PieChart } from 'react-minimal-pie-chart'

import { AllocationsTable, Button, Input } from '../../components'
import { RoundedContainer } from '../../containers'
import { useAllocationsReducer, AllocationActionKinds, AllocationState } from '../../hooks/reducers'
import { serializeAllocationState } from '../../utils'

const AllocationPage = () => {
  const [state, dispatch] = useAllocationsReducer()
  const { totalAvailableAllocation, investors, allocation } = state

  // Validate all required inputs are provided
  let canCalculate =
    !!state.totalAvailableAllocation &&
    !state.investors.find(
      ({ name, investment: { requesting, historicalAverage } }) =>
        name === '' || !requesting || !historicalAverage
    )

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="flex flex-col w-full md:w-3/4 md:mr-6 mb-8 md:mb-0">
          <h3 className="text-gray-600 font-bold mb-4">Total Allocation</h3>
          <RoundedContainer className="flex w-80 mb-8 bg">
            <Input
              className="w-full"
              label="Target amount"
              type="number"
              placeholder="0.00"
              value={totalAvailableAllocation || ''}
              onChange={(value) =>
                dispatch({
                  type: AllocationActionKinds.UpdateTotalAvailableAllocation,
                  value: parseFloat(value),
                })
              }
            />
          </RoundedContainer>

          <h3 className="text-gray-600 font-bold mb-4">Investor Breakdown</h3>
          <RoundedContainer>
            <AllocationsTable
              investors={investors}
              onInvestorChange={(investor, i) =>
                dispatch({
                  type: AllocationActionKinds.UpdateAllocationInvestor,
                  index: i,
                  investor,
                })
              }
              onRemoveInvestor={(i) =>
                investors.length > 1 &&
                dispatch({ type: AllocationActionKinds.RemoveAllocationInvestor, index: i })
              }
            />

            <div className="flex flex-row ml-9 mt-6">
              <Button
                title="+ Add investor"
                color="text"
                onClick={() => dispatch({ type: AllocationActionKinds.CreateAllocationInvestor })}
              />
              <Button
                className="ml-auto"
                title="Prorate allocation"
                isDisabled={!canCalculate}
                onClick={async () => {
                  dispatch({ type: AllocationActionKinds.PostAllocation })
                  try {
                    const response = await axios.post('/api/allocations', serializeAllocationState(state))
                    dispatch({ type: AllocationActionKinds.AllocationReceived, data: response.data })
                  } catch (error) {
                    dispatch({ type: AllocationActionKinds.AllocationError, error })
                  }
                }}
              />
            </div>
          </RoundedContainer>
        </div>

        <div className="flex flex-col w-full h-full md:w-1/4 md:ml-6">
          <h3 className="text-gray-600 font-bold mb-4">Prorated allocation</h3>
          {allocation ? (
            <div className="flex flex-col max-w-full last:mb-0">
              <PieChart
                className="p-8"
                background="#bfbfbf"
                data={Object.keys(allocation).map((name, i) => ({
                  title: name,
                  value: allocation[name],
                  color: `rgba(15,111,255, ${i % 2 == 0 ? 1 : 0.3})`,
                }))}
                totalValue={totalAvailableAllocation}
                label={({ dataEntry }) =>
                  '$' + numbro(dataEntry.value).format({ thousandSeparated: true, mantissa: 2 })
                }
                labelStyle={() => ({
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                  fontWeight: 600,
                })}
                labelPosition={60}
                lineWidth={24}
                paddingAngle={2}
                animate
              />
              {Object.keys(allocation).map((name, i) => (
                <div className="flex items-center mb-2">
                  <div
                    className="flex flex-shrink-0 items-center justify-center w-10 h-10 text-white rounded-full p-2 mr-4"
                    style={{ background: `rgba(15,111,255, ${i % 2 == 0 ? 1 : 0.5})` }}
                  >
                    {name.slice(0, 1)}
                  </div>
                  <div className="flex-shrink max-w-full overflow-ellipsis">{name}</div>
                  <div className="flex-shrink-0 font-bold ml-auto">
                    ${numbro(allocation[name]).format({ thousandSeparated: true, mantissa: 2 })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <PieChart
                className="p-8"
                data={[{ value: 1, key: 1, color: 'rgb(15,111,255)' }]}
                reveal={0}
                lineWidth={24}
                background="#bfbfbf"
                rounded
                animate
              />
              <div className="opacity-60 text-sm text-center">
                Provide deal details to calculate allocation
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AllocationPage
