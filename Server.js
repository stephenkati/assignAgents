import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';

const url = "url";
const Token = 'your_token';

const getLead = async (number) => {
  const Endpoint = 'v1/leads/upia?order=DESC&query='

  try {
    const response = await axios.get(`${url}/${Endpoint}${number}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json'
      }
    });

    const leadId = response.data?.results?.[0]?.id
    console.log(`lead id - ${leadId}`);
    
    return leadId;
  } catch (err) {
    console.log(`❌ Failed to find lead - ${number}`);
    console.error(err.response?.data || err.message);
  }
};

const assignAccountToAgent = async (number, LoId) => {
  const leadId = await getLead(number);
  if (!leadId) return;

  const sector = '8';
  const branch = 'branc';
  const market = 'market'
  const CollectionOfficer  = "1111";

  const details = {
    "sectorId": sector,
    "branchId": branch,
    "marketId": market,
    "loanOfficerId": LoId,
    "collectionOfficerId": CollectionOfficer
  };

 const Endpoint = `/v1/leads/${leadId}`;

try {
   console.log('➡️ Sending PATCH payload:', details);
  const updateLead = await axios.patch(`${url}${Endpoint}`, details, {
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
      'Accept-Encoding': 'identity'
    }
  });

  console.log(`response = ${JSON.stringify(updateLead.data, null, 2)}`);
  console.log(`✅ Lead ${leadId} updated successfully`);
} catch (err) {
  console.log(`❌ Failed to update lead ${leadId}`);
  console.error(err.response?.data || err.message);
}
};

assignAccountToAgent("254712345678", '1111')