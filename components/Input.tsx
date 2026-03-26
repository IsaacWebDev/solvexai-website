'use client';

interface InputProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  'aria-describedby'?: string;
}

export default function Input({
  name,
  label,
  type = 'text',
  required = false,
  placeholder,
  value,
  onChange,
  error,
  'aria-describedby': ariaDescribedby
}: InputProps) {
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = ariaDescribedby || errorId;
  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2 text-white/90">
        {label}
        {required && <span className="text-[#00F0FF] ml-1" aria-label="required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : 'false'}
        aria-required={required}
        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 min-h-[48px] ${
          error 
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
            : 'border-white/10 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20'
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
