'use client';

interface InputProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  label,
  type = 'text',
  required = false,
  placeholder,
  value,
  onChange
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2 text-white/90">
        {label}
        {required && <span className="text-[#00F0FF] ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 transition-all duration-300 min-h-[48px]"
      />
    </div>
  );
}
