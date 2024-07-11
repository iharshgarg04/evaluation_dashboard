const emailTemplate = (studentName, subject) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Subject Marks Notification</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="message">Subject Marks Notification</div>
			<div class="body">
				<p>Dear ${studentName},</p>
				<p>Your marks for the following subjects have been uploaded:</p>
				<ul>
					${`<li> Viva : ${subject.viva}</li>`}
					${`<li> Execution : ${subject.execution}</li>`}
					${`<li> Ideation : ${subject.ideation}</li>`}
					${`<li> team work : ${subject.teamWork}</li>`}
					${`<li> project Management : ${subject.projectManagement}</li>`}
					${`<li> total Marks : ${subject.totalMarks}</li>`}
				</ul>
				<p>Please review your marks. If you have any questions or concerns, feel free to reach out to your instructor.</p>
			</div>
			<div class="support">If you have any other questions or need assistance, please contact us at <a
					href="mailto:info@MentorView.com">info@MentorView.com</a>.</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = emailTemplate;
