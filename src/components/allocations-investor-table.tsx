import Input from './input'
import { AllocationInvestor } from '../hooks/reducers/use-allocations-reducer'

type AllocationsTableProps = {
  investors: AllocationInvestor[]
  onInvestorChange: (investor: AllocationInvestor, index: number) => void
  onRemoveInvestor: (index: number) => void
}

type AllocationsTableRowProps = {
  investor: AllocationInvestor
  isFirstRow?: boolean
  isRemovalDisabled?: boolean
  onInvestorChange: (newInvestor: AllocationInvestor) => void
  onRemoveInvestor: () => void
}

const AllocationsTable = ({ investors, onInvestorChange, onRemoveInvestor }: AllocationsTableProps) => (
  <>
    {investors.map((investor, i) => (
      <AllocationsTableRow
        key={i}
        isFirstRow={i === 0}
        isRemovalDisabled={investors.length === 1}
        investor={investor}
        onInvestorChange={(investor) => onInvestorChange(investor, i)}
        onRemoveInvestor={() => onRemoveInvestor(i)}
      />
    ))}
  </>
)

const AllocationsTableRow = ({
  investor: { name, investment },
  isFirstRow,
  isRemovalDisabled,
  onInvestorChange,
  onRemoveInvestor,
}: AllocationsTableRowProps) => {
  return (
    <div className="flex items-center mb-2">
      <button
        className={`w-10 h-10 -ml-3 mr-2 rounded-xl ${
          isRemovalDisabled ? 'pointer-events-none opacity-0' : 'opacity-10'
        }  text-xs hover:text-red-400 hover:opacity-100 hover:bg-angellist-off-white transform hover:-scale-103 transition-colors transition-opacity transition-transform duration-300 ease-in-out ${
          isFirstRow ? 'mt-8' : 'mt-2'
        }`}
        onClick={onRemoveInvestor}
      >
        ✖
      </button>
      <div className="grid grid-cols-12 gap-2 md:gap-6 w-full ">
        <Input
          className="col-span-4"
          type="text"
          label={isFirstRow && 'Name'}
          placeholder="Xinran Xiao"
          value={name || ''}
          onChange={(value) => onInvestorChange({ investment, name: value })}
        />
        <Input
          className="col-span-4"
          type="number"
          label={isFirstRow && 'Requested amount'}
          placeholder="0.00"
          value={investment.requesting || ''}
          onChange={(value) =>
            onInvestorChange({
              name,
              investment: {
                ...investment,
                requesting: parseFloat(value),
              },
            })
          }
        />
        <Input
          className="col-span-4"
          type="number"
          label={isFirstRow && 'Average investment'}
          placeholder="0.00"
          value={investment.historicalAverage || ''}
          onChange={(value) =>
            onInvestorChange({
              name,
              investment: {
                ...investment,
                historicalAverage: parseFloat(value),
              },
            })
          }
        />
      </div>
    </div>
  )
}

export default AllocationsTable
