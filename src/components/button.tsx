type ButtonProps = {
  className?: string
  color?: 'blue' | 'text'
  isDisabled?: boolean
  title: string
  onClick: () => void
}

const Button = ({ className, color = 'blue', isDisabled, title, onClick }: ButtonProps) => (
  <button
    className={`p-4 ${
      color === 'blue'
        ? `bg-angellist-blue text-white ${
            isDisabled ? 'opacity-30 pointer-events-none' : 'opacity-100 hover:opacity-80'
          } `
        : 'text-gray-500 bg-opacity-0 hover:bg-opacity-80 bg-gray-200 '
    } text-sm font-medium rounded-xl ${className || ''} transition-all duration-200 ease-in-out `}
    onClick={() => !isDisabled && onClick()}
    disabled={isDisabled}
  >
    {title}
  </button>
)

export default Button
