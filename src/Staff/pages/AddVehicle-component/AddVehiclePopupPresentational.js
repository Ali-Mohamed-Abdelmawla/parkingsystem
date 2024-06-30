

// new validation with enhance UX

// import React, { useState } from "react";
// import styles from "./AddVehiclePopup.module.css";
// import cancelIconLight from "../../assets/light-mode/cancel.svg";
// import cancelIconDark from "../../assets/Dark-mode/cancel.svg";
// import LoadingButton from "@mui/lab/LoadingButton";
// import AddIcon from "@mui/icons-material/Add";
// import Tooltip from "@mui/material/Tooltip";
// import InfoIcon from "@mui/icons-material/Info";

// function AddVehiclePopupPresentational({
//   register,
//   handleSubmit,
//   errors,
//   darkMode,
//   onClose,
//   loading,
// }) {
//   const allowedArabicLetters = "ابجدرسصطعقلمنهوي";
//   const allowedArabicLettersRegex = new RegExp(`^[${allowedArabicLetters}]+$`);
//   const numberRegex = /^[0-9\u0660-\u0669]+$/;

//   const [letterInput, setLetterInput] = useState("");

//   const handleLetterInput = (e) => {
//     const input = e.target.value;
//     const validInput = input
//       .split("")
//       .filter((char) => allowedArabicLetters.includes(char))
//       .join("");
//     setLetterInput(validInput);
//   };

//   return (
//     <div
//       className={`${styles.popupContainer} ${darkMode ? styles.darkMode : ""}`}
//     >
//       <div className={styles.popup}>
//         <div>
//           <img
//             src={darkMode ? cancelIconDark : cancelIconLight}
//             alt="Cancel"
//             className={styles.cancelIcon}
//             onClick={onClose}
//           />
//         </div>
//         <div className={styles.header}>
//           <h2>License Plate Number</h2>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className={styles.inputWrapper}>
//             <input
//               type="text"
//               {...register("letters", {
//                 required: "Arabic letters are required",
//                 minLength: {
//                   value: 2,
//                   message: "Please enter at least 2 characters.",
//                 },
//                 maxLength: {
//                   value: 3,
//                   message: "Please keep it to a maximum of 3 characters.",
//                 },
//                 pattern: {
//                   value: allowedArabicLettersRegex,
//                   message: "Please enter only the allowed Arabic letters",
//                 },
//                 validate: (value) => {
//                   const uniqueChars = [...new Set(value)];
//                   return uniqueChars.length === value.length || "Each letter should be unique";
//                 },
//               })}
//               maxLength={3}
//               className={styles.input}
//               placeholder="Arabic Letters"
//               value={letterInput}
//               onChange={handleLetterInput}
//             />
//             <Tooltip title={`Allowed letters: ${allowedArabicLetters}`} arrow>
//               <InfoIcon className={styles.infoIcon} />
//             </Tooltip>
//           </div>
//           {errors.letters && (
//             <span className={styles.error}>{errors.letters.message}</span>
//           )}
//           <input
//             type="text"
//             {...register("numbers", {
//               required: "Numbers are required",
//               minLength: {
//                 value: 3,
//                 message: "Please enter at least 3 numbers.",
//               },
//               maxLength: {
//                 value: 4,
//                 message: "Please keep it to a maximum of 4 numbers.",
//               },
//               pattern: {
//                 value: numberRegex,
//                 message: "Please enter numbers only",
//               },
//             })}
//             maxLength={4}
//             className={styles.input}
//             placeholder="Numbers"
//           />
//           {errors.numbers && (
//             <span className={styles.error}>{errors.numbers.message}</span>
//           )}
//           <LoadingButton
//             endIcon={<AddIcon />}
//             loading={loading}
//             loadingPosition="end"
//             variant="contained"
//             type="submit"
//             className={`${styles.addButton} custom-loading-button`}
//           >
//             <span>Add</span>
//           </LoadingButton>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddVehiclePopupPresentational;

// new new validation


import React, { useState } from "react";
import styles from "./AddVehiclePopup.module.css";
import cancelIconLight from "../../assets/light-mode/cancel.svg";
import cancelIconDark from "../../assets/Dark-mode/cancel.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

function AddVehiclePopupPresentational({
  register,
  handleSubmit,
  errors,
  darkMode,
  onClose,
  loading,
}) {
  const allowedArabicLetters = "أ ب ج د ر س ص ط ع ق ل م ن ه و ى";
  const allowedArabicLettersRegex = new RegExp(`^[${allowedArabicLetters.replace(/\s/g, '')}]+$`);
  const numberRegex = /^[0-9\u0660-\u0669]+$/;

  const [letterInput, setLetterInput] = useState("");

  const handleLetterInput = (e) => {
    const input = e.target.value;
    const validInput = input
      .split("")
      .filter((char) => allowedArabicLetters.replace(/\s/g, '').includes(char))
      .join("");
    setLetterInput(validInput);
  };

  const AllowedLettersTooltip = () => (
    <div className={styles.allowedLettersTooltip}>
      <p>Allowed letters:</p>
      <div className={styles.letterGrid}>
        {allowedArabicLetters.split(' ').map((letter, index) => (
          <span key={index} className={styles.letter}>{letter}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`${styles.popupContainer} ${darkMode ? styles.darkMode : ""}`}
    >
      <div className={styles.popup}>
        <div>
          <img
            src={darkMode ? cancelIconDark : cancelIconLight}
            alt="Cancel"
            className={styles.cancelIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.header}>
          <h2>License Plate Number</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              {...register("letters", {
                required: "Arabic letters are required",
                minLength: {
                  value: 2,
                  message: "Please enter at least 2 characters.",
                },
                maxLength: {
                  value: 3,
                  message: "Please keep it to a maximum of 3 characters.",
                },
                pattern: {
                  value: allowedArabicLettersRegex,
                  message: "Please enter only the allowed Arabic letters",
                },
                // validate: (value) => {
                //   const uniqueChars = [...new Set(value)];
                //   return uniqueChars.length === value.length || "Each letter should be unique";
                // },
              })}
              maxLength={3}
              className={styles.input}
              placeholder="Arabic Letters"
              value={letterInput}
              onChange={handleLetterInput}
            />
            <Tooltip title={<AllowedLettersTooltip />} arrow>
              <InfoIcon className={styles.infoIcon} />
            </Tooltip>
          </div>
          {errors.letters && (
            <span className={styles.error}>{errors.letters.message}</span>
          )}
          <input
            type="text"
            {...register("numbers", {
              required: "Numbers are required",
              minLength: {
                value: 3,
                message: "Please enter at least 3 numbers.",
              },
              maxLength: {
                value: 4,
                message: "Please keep it to a maximum of 4 numbers.",
              },
              pattern: {
                value: numberRegex,
                message: "Please enter numbers only",
              },
            })}
            maxLength={4}
            className={styles.input}
            placeholder="Numbers"
          />
          {errors.numbers && (
            <span className={styles.error}>{errors.numbers.message}</span>
          )}
          <LoadingButton
            endIcon={<AddIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            type="submit"
            className={`${styles.addButton} custom-loading-button`}
          >
            <span>Add</span>
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}

export default AddVehiclePopupPresentational;