import React from "react";

function JobDetails({ job }) {
  console.log(job);
  const convertDate = (date) => {
    const createDate = new Date(date);
    const formattedDate = createDate.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  };
  return (
    <div className="job-details">
      <h1>Job Details</h1>
      <p>Service: {job.service.name}</p>
      <p>Client: {job.client.name}</p>
      <p>Amount: {job.Payment.amount}</p>
      <p>Payment Method: {job.Payment.method}</p>
      <p>Payment Status: {job.Payment.isPaid ? "✅" : "⏳"}</p>
      <p>Job date: {convertDate(job.createdAt)}</p>

      <p>Notes:</p>
      {job.Note.map((note) => (
        <div id="job-note">
          <p>{note.note}</p>
          <p>{note.user.name}</p>
          <p>{convertDate(note.createdAt)}</p>
        </div>
      ))}
      <form>
        <textarea type="text" name="note" id="note" placeholder="Add a note" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default JobDetails;
