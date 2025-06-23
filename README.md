📄 Lead Assignment Script Documentation
This Node.js script reads a phone number, fetches a matching lead ID via an API, and assigns that lead to a loan officer by updating its associated sector, branch, market, and collection officer details.

🔧 Setup
1. Dependencies
Ensure the following packages are installed:

bash
Copy
Edit
npm install axios csv-parser fs
2. Environment Variables
Set your API base URL and authorization token directly in the script:

js
Copy
Edit
const url = "https://your-api-base.com";   // Replace with your actual API base URL
const Token = 'your_token_here';           // Replace with your valid Bearer token
⚙️ Functions Overview
1. getLead(number)
Fetches a lead from the API using the provided phone number (number).

Endpoint: GET /v1/leads/upia?order=DESC&query=<number>

Returns: The lead ID if found.

js
Copy
Edit
const leadId = await getLead('254712345678');
2. assignAccountToAgent(number, LoId)
Assigns the specified lead to a loan officer and updates sector, branch, market, and collection officer details.

Parameters:

number – Phone number of the lead.

LoId – Loan Officer ID.

PATCH Endpoint: /v1/leads/:leadId

Payload:

json
Copy
Edit
{
  "sectorId": "8",
  "branchId": "branc",
  "marketId": "market",
  "loanOfficerId": "LoId",
  "collectionOfficerId": "1111"
}
js
Copy
Edit
assignAccountToAgent('254712345678', 'LO123456');
📦 Sample Execution
js
Copy
Edit
assignAccountToAgent('254712345678', 'LO123456');
🐛 Error Handling
Errors during fetching or updating are logged to the console.

Failures will include API error messages or status codes for easier debugging.

📌 Notes
You must have valid credentials and access rights to perform GET and PATCH operations on the API.

The sector, branch, and market IDs are currently hardcoded—customize these as needed for your use case.

📁 Future Enhancements
Read phone numbers from a CSV file and loop through them.

Validate phone number format before making the API call.

Extract constants like sector, branch, and collection officer to a config file or .env.
