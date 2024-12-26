import React, { FC } from 'react';

interface DropdownProps {
    id: string;
    name: string;
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    required?: boolean;
    className?: string; // Optional for additional styling
}

const DropdownInputForm: FC<DropdownProps> = ({
    id,
    name,
    options,
    value,
    onChange,
    label,
    required = false,
    className = '',
}) => {
    return (
        <div>
            <label htmlFor={id} className="font-semibold text-gray-700">
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full p-2 border border-gray-300 rounded ${className}`}
                required={required}
            >
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownInputForm;
