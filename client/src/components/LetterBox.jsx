const LetterBox = ({ letter, onChange, id }) => {
  return (
    <div className="border-2 border-gray-300 w-12 h-12 mx-1 flex justify-center items-center">
      <input
        type="text"
        value={letter}
        onChange={onChange}
        id={id}
        className="text-lg font-bold w-full h-full text-center uppercase"
        maxLength="1"
        style={{ border: "none", background: "transparent" }}
      />
    </div>
  );
};

export default LetterBox;
