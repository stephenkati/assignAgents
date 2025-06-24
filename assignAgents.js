import axios from 'axios';
import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.API_URL;
const Token = process.env.API_TOKEN;

const getCustomer = async (number) => {
  const Endpoint = 'customers?order=DESC&query='

  try {
    const response = await axios.get(`${url}/${Endpoint}${number}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json'
      }
    });

    const results = response.data;
    // console.log(`results - ${JSON.stringify(results, null, 2)}`)

    return results?.results || [];
  } catch (err) {
    console.log(`❌ Failed to find customer - ${number}`);
    console.error(err.response?.data || err.message);
  }
};
// getCustomer("254115810293")

const updateCustomer = async (number, LoId) => {
  const customer = await getCustomer(number);
  const customerId = await customer[0]?.id

  if(!customerId) return

  const details = {
    "assignedSectorId": process.env.SECTOR,
    "assignedBranchId": process.env.BRANCH,
    "assignedCentreId": process.env.MARKETID,
    "assignedBranchKey": process.env.BRANCHKEY,
    "_Staff_Association_Clients": [{
      _index: 0,
      op: "REPLACE",
      Loan_Officer_Clients: LoId,

    }]
  };

  const Endpoint = `customers/${customerId}`;

  try {
    const updateResponse = await axios.patch(`${url}${Endpoint}`,
      details,
      {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'identity'
      }
    });
      
      // console.log(`response = ${JSON.stringify(updateResponse.data, null, 2)}`);
      console.log(`✅ Customer ${number} updated successfully`);
      return updateResponse;

  } catch (err) {
    console.log(`Failed to update customer - ${number}`)
    console.error(err.response?.data || err.message);
  }

};

const readCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv({ headers: ['number', 'loId'], skipEmptyLines: true}))
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

const fetchContent = async (file) => {
  try {
    const data = await readCSV(file);

    for (const row of data) {
      const number = row.number?.trim();
      const LoId = row.loId?.trim();

      if (!number || !LoId) {
        console.warn(`⚠️ Skipping invalid row:`, row);
        continue;
      }

      await updateCustomer(number, LoId);
    }

    console.log('✅ All customers processed');
  } catch (error) {
    console.error('❌ Error reading CSV:', error.message);
  }
};

fetchContent('test.csv');