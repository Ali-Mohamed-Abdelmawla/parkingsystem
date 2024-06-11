// BulkEmails.js
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import Employeestyle from "../../System-admin/AddReport-component/AddReport.module.css";
function BulkEmails({ onClose, onSend, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSend(data.title, data.message);
  };

  return (
    <div className={Employeestyle.addReportModal}>
          <div className={Employeestyle.addTitle}>
            <button onClick={onClose}></button>
          </div>      <h2>Send an email to System users</h2>
      <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", {
            required: "Title for the message is required",
          })}
          type="text"
          placeholder="Enter the title here..."
        />
        {errors.title && (
          <span className={Employeestyle.errorMessage}>
            {errors.title.message}
          </span>
        )}

        <textarea
          {...register("message", { required: "Message is required" })}
          placeholder="Enter your message here..."
        />
        {errors.message && (
          <span className={Employeestyle.errorMessage}>
            {errors.message.message}
          </span>
        )}
        <div className={Employeestyle.addModelButtons}>
          <LoadingButton
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Send</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}

export default BulkEmails;
