type InputProps<T = any> = {
  className?: string
  value: T
  type?: HTMLInputElement['type']
  label?: string
  placeholder?: string
  onChange: (value: T) => void
  icon?: any
}

const Input = ({ className, icon, label, type = 'text', onChange, ...props }: InputProps) => (
  <div className={className}>
    {label && (
      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
        {label}
      </label>
    )}
    <div className="relative rounded-md">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
      )}
      <input
        className={`bg-gray-200 mt-1 outline-none focus:ring focus:ring-angellist-blue focus:border-angellist-blue block w-full pl-${
          icon ? 7 : 3
        } pr-3 sm:text-sm rounded-none rounded${icon ? '-r' : ''}-md transition-shadow ease-in-out`}
        type={type}
        {...props}
        min={0}
        step={0.01}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
)

export default Input
