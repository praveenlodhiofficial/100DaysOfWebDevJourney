import React, { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const passwordRef = useRef(null); // Reference for password input field
  const [length, setLength] = useState(20); // State for password length
  const [addNumber, setAddNumber] = useState(false); // State to include numbers
  const [addCharacter, setAddCharacter] = useState(false); // State to include special characters
  const [password, setPassword] = useState(''); // State to store the generated password
  const [passwordCopied, setPasswordCopied] = useState(false)

  // Generate password based on current settings
  const PasswordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Add special characters if the option is selected
    if (addCharacter) str += "`~!@#$%^&*()_+=-:,.<>?/\\|*";

    // Add numbers if the option is selected
    if (addNumber) str += '0123456789';

    // Generate password by randomly picking characters
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass); // Update the password state
  }, [addNumber, addCharacter, length]);

  // Automatically generate password whenever settings change
  useEffect(() => {
    const generatePassword = PasswordGenerator();
    return () => {
      clearInterval(generatePassword); // Cleanup function
    };
  }, [addCharacter, addNumber, PasswordGenerator, length]);

  // Copy the generated password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    // Highlight the password text in the input field
    passwordRef.current?.select();

    // Copy the selected text to the clipboard
    window.navigator.clipboard.writeText(password);
    setPasswordCopied(true)

  }, [password]);

  return (
    <>
<div className="items-center justify-center p-20 flex">
<div className="p-10 rounded-lg flex justify-center gap-5 border border-dashed border-slate-300 flex-col items-center text-white text-sm">
        {/* Heading */}
        <div className="text-2xl uppercase">Password Generator</div>

        <div className="flex">
          {/* Generated Password Field */}
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            placeholder="Random Password Generator"
            className="text-center p-2 focus:outline-none w-80 rounded-lg rounded-r-none border-r-0 border border-dashed border-slate-300"
          />

          {/* Copy Button */}
          <button
            className="border border-dashed border-slate-300 rounded-lg rounded-l-none text-white font-semibold px-5 py-2 bg-blue-500"
            onClick={copyPasswordToClipboard}
          >
            {!passwordCopied ? 'Copy' : 'Copied'}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Password Length Slider */}
          <div className="flex gap-1">
            <input
              type="range"
              min={10}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          {/* Include Numbers Checkbox */}
          <div className="flex gap-1">
            <input
              type="checkbox"
              onClick={() => setAddNumber((prev) => !prev)}
              id="numberInput"
              defaultChecked={addNumber}
            />
            <label>Include Numbers {addNumber}</label>
          </div>

          {/* Include Special Characters Checkbox */}
          <div className="flex gap-1">
            <input
              type="checkbox"
              onClick={() => setAddCharacter((prev) => !prev)}
              id="characterInput"
              defaultChecked={addCharacter}
            />
            <label>Include Characters {addCharacter}</label>
          </div>
        </div>
      </div>
</div>
    </>
  );
};

export default App;
