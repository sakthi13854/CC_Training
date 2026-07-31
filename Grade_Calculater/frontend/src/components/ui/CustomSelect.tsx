import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

export interface SelectOption {
  value: string | number;
  label: string;
  code?: string;
  isCustom?: boolean;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
}

export function CustomSelect({ value, onChange, options, className = '', placeholder }: CustomSelectProps) {
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className={`relative ${className}`}>
          <Listbox.Button className="relative w-full cursor-default rounded-xl bg-slate-900 border border-[#3A3550] py-2.5 pl-4 pr-10 text-left text-sm text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-200">
            <span className="block truncate">
              {selectedOption ? (
                <>
                  {selectedOption.code && <span className="font-bold mr-2 text-indigo-300">{selectedOption.code}</span>}
                  <span className={selectedOption.code ? 'font-normal' : 'font-medium'}>{selectedOption.label}</span>
                </>
              ) : (
                placeholder || 'Select an option'
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg 
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
          >
            <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-[#1E1B2E] py-2 text-base shadow-2xl shadow-black/50 ring-1 ring-white/10 focus:outline-none sm:text-sm custom-scrollbar">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={`${option.value}-${idx}`}
                  className={({ active, selected }) =>
                    `relative cursor-default select-none py-3 pl-4 pr-4 transition-colors ${
                      option.isCustom ? 'border-t border-white/10 mt-1' : ''
                    } ${
                      selected
                        ? 'bg-indigo-500/15 text-white border-l-4 border-l-indigo-500'
                        : active
                        ? 'bg-slate-800 text-white border-l-4 border-l-transparent'
                        : 'text-slate-300 border-l-4 border-l-transparent'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                       {option.isCustom ? (
                        <span className="text-indigo-400 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          {option.label}
                        </span>
                      ) : (
                        <>
                          {option.code && <span className={`font-bold mr-2 ${selected ? 'text-indigo-300' : 'text-slate-400'}`}>{option.code}</span>}
                          <span>{option.label}</span>
                        </>
                      )}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
