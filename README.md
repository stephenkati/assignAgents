### 📄 Lead Assignment Script Documentation
This Node.js script reads a phone number, fetches a matching customer via an API, and assigns that customer to a loan officer by updating its associated sector, branch, market, and collection officer details.

🔧 **Setup**
1. **Dependencies**
Ensure the following packages are installed:
```
npm install axios csv-parser fs
```
2.** Environment Variables**
Set your API base URL and authorization token in the `.env` file:

```
API_URL=https://your-api-url.com/
API_TOKEN=your_token_here

SECTOR=your_sector_id
BRANCH=your_branch_id
MARKETID=your_market_id
BRANCHKEY=your_branch_key
```

⚙️** Functions Overview**
1. **getcustomer(number)**

Fetches a customer from the API using the provided phone number (number).

 `Endpoint: GET /v1/customers/upia?order=DESC&query=<number>`

Returns: The customer ID if found.
```
const customerId = await getCustomer('254712***678');
```

2. **updateCustomer(number, LoId)**

Assigns the specified customer to a loan officer and updates sector, branch, market, and loan officer details.

Parameters:
```
number – Phone number of the customer.
LoId – Loan Officer ID.
PATCH Endpoint: /v1/customers/:customerId
```

Payload:
```
{
  "assignedSectorId": process.env.SECTOR,
  "assignedBranchId": process.env.BRANCH,
  "assignedCentreId": process.env.MARKETID,
  "assignedBranchKey": process.env.BRANCHKEY,
  "_Staff_Association_Clients": [{
    _index: 0,
    op: "REPLACE",
    Loan_Officer_Clients: LoId,
  }]
}
```

3. **readCSV(filePath)**

Reads a CSV file and extracts rows with number and loId columns.

```
254712***678,Lo_Id_1
254712***678,Lo_Id_2
```

4. **fetchContent(filePath)**

Reads a CSV and processes each row to update customer assignments.

```
fetchContent('test.csv');
```

📦 **Sample Execution**
```
node assignAgents
```
🐛 **Error Handling**
- Invalid or missing rows are skipped with a warning.
- API failures (fetching or updating) are logged with detailed error messages.

📌 **Notes**
- All credentials and location settings are stored in .env for security and flexibility.  
- If a customer is not found, or lacks a valid ID, that record is skipped.

📁 **Future Enhancements**
- ✅ Assign customers in bulk from a CSV file (already implemented).
- 🔲 Add support for exporting results to a success/failure report.
- 🔲 Validate phone number and loan officer ID format before API call.
