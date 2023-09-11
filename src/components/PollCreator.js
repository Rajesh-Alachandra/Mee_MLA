import React, { useState, useEffect } from 'react';

function PollCreator() {
    const [options, setOptions] = useState(['Yes', 'No']);
    const [newOption, setNewOption] = useState('');
    const [pollCreated, setPollCreated] = useState(false);
    const [question, setQuestion] = useState('');

    useEffect(() => {

        fetchOptionsFromBackend()
            .then((data) => {

                setOptions([...options, ...data]);
            })
            .catch((error) => {
                console.error('Error fetching options:', error);
            });
    }, []);

    const fetchOptionsFromBackend = async () => {

        const response = await fetch('/api/options');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch options from the backend');
        }
    };

    const handleAddOption = () => {
        if (newOption.trim() !== '') {
            const newOptions = [...options, newOption];
            setOptions(newOptions);
            setNewOption('');
        }
    };

    const handleCreatePoll = () => {
        setPollCreated(true);
    };

    const renderOptions = () => {
        return options.map((option, index) => (
            <div key={index}>
                <label>
                    <input type="radio" name="pollOption" value={option} />
                    {option}
                </label>
            </div>
        ));
    };

    const renderPoll = () => {
        return (
            <div>
                <h2>{question}</h2>
                {renderOptions()}
            </div>
        );
    };

    return (
        <div>
            <h1>Create a Poll</h1>
            {pollCreated ? (
                renderPoll()
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    {renderOptions()}
                    <div>
                        <input
                            type="text"
                            placeholder="New Option"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                        />
                        <button onClick={handleAddOption}>Add Option</button>
                    </div>
                    <button onClick={handleCreatePoll}>Create Poll</button>
                </div>
            )}
        </div>
    );
}

export default PollCreator;