import React from 'react';

type JobFieldSelectorProps = {
    jobFields: string[];
    selectedJobFields: string[];
    onJobFieldChange: (selected: string[]) => void;
};

const JobFieldSelector: React.FC<JobFieldSelectorProps> = ({ jobFields, selectedJobFields, onJobFieldChange }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        onJobFieldChange(selectedOptions);
    };

    return (
        <select multiple value={selectedJobFields} onChange={handleSelectChange} className="w-full p-2 border border-gray-300 rounded">
            {jobFields.map((field) => (
                <option key={field} value={field}>
                    {field}
                </option>
            ))}
        </select>
    );
};

export default JobFieldSelector;
