import { useReducer } from 'react'

type AllocationState = {
  totalAvailableAllocation: number
  investors: AllocationInvestor[]
  allocation: { name: AllocationInvestor['name']; investmentAmount: number }[]
  isLoading?: boolean
  error?: any
}

type AllocationInvestor = {
  name: string
  investment: {
    requesting: number
    historicalAverage: number
  }
}

enum AllocationActionKinds {
  UpdateTotalAvailableAllocation = 'UPDATE TOTAL AVAILABLE ALLOCATION',
  CreateAllocationInvestor = 'CREATE ALLOCATION INVESTOR',
  UpdateAllocationInvestor = 'UPDATE ALLOCATION INVESTOR',
  RemoveAllocationInvestor = 'REMOVE ALLOCATION INVESTOR',
  PostAllocation = 'POST ALLOCATION',
  AllocationPending = 'ALLOCATION PENDING',
  AllocationReceived = 'ALLOCATION RECEIVED',
  AllocationError = 'ALLOCATION ERROR',
}

type AllocationActions =
  | {
      type: AllocationActionKinds.UpdateTotalAvailableAllocation
      value: number
    }
  | {
      type: AllocationActionKinds.CreateAllocationInvestor
    }
  | {
      type: AllocationActionKinds.UpdateAllocationInvestor
      index: number
      investor: AllocationInvestor
    }
  | {
      type: AllocationActionKinds.RemoveAllocationInvestor
      index: number
    }
  | {
      type: AllocationActionKinds.PostAllocation
    }
  | {
      type: AllocationActionKinds.AllocationReceived
      data: {
        name: string
        investmentAmount: number
      }[]
    }
  | {
      type: AllocationActionKinds.AllocationError
      error: string
    }

const allocationsReducer = (state: AllocationState, action: AllocationActions) => {
  let newState = { ...state }

  switch (action.type) {
    case AllocationActionKinds.UpdateTotalAvailableAllocation:
      newState.totalAvailableAllocation = action.value
      break
    case AllocationActionKinds.CreateAllocationInvestor:
      newState.investors = [
        ...state.investors,
        { name: null, investment: { requesting: null, historicalAverage: null } },
      ]
      break
    case AllocationActionKinds.UpdateAllocationInvestor:
      newState.investors[action.index] = action.investor
      break
    case AllocationActionKinds.RemoveAllocationInvestor:
      newState.investors.splice(action.index, 1)
      break
    case AllocationActionKinds.PostAllocation:
      newState.isLoading = true
      break
    case AllocationActionKinds.AllocationReceived:
      newState.allocation = action.data
      break
    case AllocationActionKinds.AllocationError:
      newState.error = action.error
      break
    default:
      break
  }

  return newState
}

const useAllocationsReducer = () =>
  useReducer(allocationsReducer, {
    totalAvailableAllocation: null,
    investors: [
      {
        name: '',
        investment: {
          requesting: null,
          historicalAverage: null,
        },
      },
    ],
    allocation: null,
  })

export default useAllocationsReducer
export { AllocationActionKinds }
export type { AllocationInvestor, AllocationState }
