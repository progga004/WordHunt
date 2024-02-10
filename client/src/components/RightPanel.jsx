/* eslint-disable react/prop-types */
const RightPanel = ({ username, guesses, letters}) => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl text-lg">
      <h2 className="font-bold text-xl mb-4">{username}</h2>
      <p className="mb-4">Guesses | # in Common</p>
      <div className="bg-gray-100 p-4 rounded">
        {guesses.map((guess, index) => (
          <p key={index} className="mb-2">
            {guess} | {letters[index]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
