export default function MailMerger() {
  return (
    <>
      <img
        className="description"
        src="../images/mail-merger-example.png"
        alt="people.txt example"
      />

      <p>
        The purpose of this project is to send emails with the same body but to
        different people with their own titles and names from a google account.
        This project was created to help a friend email professors about
        research opportunities in their current projects. This project uses the
        smtplib and email.message Python modules.
      </p>

      <p>
        For the script to work, you will need to follow the instructions in
        <a
          href="https://www.youtube.com/watch?v=g_j6ILT-X0k"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          this video
        </a>{" "}
        to turn on the two step verification for the Google Account.
      </p>

      <p>The repository contains two files:</p>

      <ul>
        <li>
          <code>main.py</code>: Write the body of the email by editing this
          file. Write the body in the variable called <code>body</code> which is
          a f-string
        </li>
        <li>
          <code>people.txt</code>: Write the title, last name, and email
          separated by spaces. Separate each different person with a new line.
          Example: <code>Dr. Foo foo@bar.com</code>
        </li>
      </ul>

      <p>
        To run the file in the command line, just run{" "}
        <code>python3 main.py</code>
      </p>

      <p>
        The source code can be found
        <a
          href="https://github.com/AcevedoJetter/mail-merge"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          here
        </a>
        .
      </p>
    </>
  );
}
