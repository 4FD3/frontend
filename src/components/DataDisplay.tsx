import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import backgroundImg from '../images/sorry.png';
import { PieChartUseThis, AreaChartUseThis, RadarChartUseThis } from './Charts.tsx';
import StickyHeadTable from './DetailTable.tsx';
import VirtualizedList from './ListData.tsx';
import Paper from '@mui/material/Paper';

const dataR = [
    {
        subject: 'Apparel',
        year_2021: 100,
        year_2022: 120,
        year_2023: 110,
        fullMark: 150,
    },
    {
        subject: 'Electronics',
        year_2021: 100,
        year_2022: 135,
        year_2023: 130,
        fullMark: 150,
    },
    {
        subject: 'Home & Garden',
        year_2021: 100,
        year_2022: 86,
        year_2023: 130,
        fullMark: 150,
    },
    {
        subject: 'Health & Beauty',
        year_2021: 100,
        year_2022: 99,
        year_2023: 100,
        fullMark: 150,
    },
    {
        subject: 'Grocery',
        year_2021: 100,
        year_2022: 85,
        year_2023: 90,
        fullMark: 150,
    },
    {
        subject: 'Others',
        year_2021: 100,
        year_2022: 65,
        year_2023: 85,
        fullMark: 150,
    },
];

const data = [
    {
        name: 'Jan',
        year_2021: 3500,
        year_2022: 4000,
        year_2023: 2400,
    },
    {
        name: 'Feb',
        year_2021: 3000,
        year_2022: 3000,
        year_2023: 1398,
    },
    {
        name: 'March',
        year_2021: 5500,
        year_2022: 2000,
        year_2023: 9800,
    },
    {
        name: 'April',
        year_2021: 8900,
        year_2022: 2780,
        year_2023: 3908,
    },
    {
        name: 'May',
        year_2021: 3500,
        year_2022: 1890,
        year_2023: 4800,
    },
    {
        name: 'June',
        year_2021: 2500,
        year_2022: 2390,
        year_2023: 3800,
    },
    {
        name: 'July',
        year_2021: 1500,
        year_2022: 3490,
        year_2023: 4300,
    },
];

const dummyData = {
    "ocr_type": "receipts",
    "request_id": "P_0-0-0-0-0-0-0-1_kr3awxez_810",
    "ref_no": "AspDemo_1626256135747_535",
    "file_name": "US-1.jpg",
    "request_received_on": 1626256135995,
    "success": true,
    "image_width": 299,
    "image_height": 400,
    "image_rotation": 0.006,
    "recognition_completed_on": 1626256139343,
    "receipts": [{
        "merchant_name": "Walmart",
        "merchant_address": "1317 N MAIN ST STE A1, SUMMERVILLE SC 29483",
        "merchant_phone": "+1 843-821-1991",
        "merchant_website": null,
        "merchant_tax_reg_no": null,
        "merchant_company_reg_no": null,
        "region": null,
        "mall": null,
        "country": "US",
        "receipt_no": "09825",
        "date": "2013-11-29",
        "time": "04:04",
        "items": [{
            "amount": 149.99,
            "description": "3DSXL BUNDLE 004549678097",
            "flags": " T",
            "qty": null,
            "remarks": null,
            "unitPrice": null
        }, {
            "amount": 149.99,
            "description": "3DSXL BUNDLE 004549678097",
            "flags": " T",
            "qty": null,
            "remarks": null,
            "unitPrice": null
        }],
        "currency": "USD",
        "total": 323.98,
        "subtotal": 299.98,
        "tax": 24.00,
        "service_charge": null,
        "tip": null,
        "payment_method": "cash",
        "payment_details": null,
        "credit_card_type": null,
        "credit_card_number": null,
        "ocr_text": "    Walmart\n     Save money. Live better.\n            ( 843) 821 - 1991\n        MANAGER MICHAEL MOELLER\n         1317 N MAIN ST STE A1\n          SUMMERVILLE SC 29483\n ST: 1037 OP: 00001099 TE: 67 TR: 09825\n PRODUCT SERIAL # SW404491404\n 3DSXL BUNDLE 004549678097 149.99 T\n PRODUCT SERIAL #SV404491879\n 3DSXL BUNDLE 004549678097 149.99 T\n                    SUBTOTAL 299.98\n           TAX 1 8.000 X 24.00\n                       TOTAL 323.98\n                  CASH TEND 20.00\n                 DEBIT TEND 303.98\n                  CHANGE DUE 0.00\n  EFT DEBIT PAY FROM PRIMARY\n     303.98 TOTAL PURCHASE\n   ACCOUNT:**** **** **** 6151 S\n   REF 8 333300109919\n   NETWORK ID. 0082 APPR CODE 176481\n   TERMINAL # 19001068\n            11/29/13 04:04:16\n     # ITEMS SOLD 2\n      TC: 8487 7978 1832 0818 3098 6",
        "ocr_confidence": 94.50,
        "width": 215,
        "height": 374,
        "avg_char_width": null,
        "avg_line_height": null,
        "source_locations": {
            "date": [[{ "x": 95, "y": 307 }, { "x": 211, "y": 307 }, { "x": 211, "y": 325 }, { "x": 95, "y": 325 }]],
            "total": [[{ "x": 159, "y": 183 }, { "x": 247, "y": 182 }, { "x": 247, "y": 194 }, { "x": 159, "y": 194 }]],
            "receipt_no": [[{ "x": 228, "y": 110 }, { "x": 256, "y": 110 }, { "x": 256, "y": 124 }, { "x": 228, "y": 124 }]],
            "subtotal": [[{ "x": 139, "y": 163 }, { "x": 246, "y": 162 }, { "x": 246, "y": 174 }, { "x": 139, "y": 176 }]],
            "merchant_name": [[{ "x": 58, "y": 3 }, { "x": 210, "y": 7 }, { "x": 209, "y": 54 }, { "x": 57, "y": 50 }]],
            "doc": [[{ "x": 31, "y": -12 }, { "x": 268, "y": -11 }, { "x": 265, "y": 399 }, { "x": 29, "y": 398 }]],
            "tax": [[{ "x": 90, "y": 173 }, { "x": 249, "y": 171 }, { "x": 249, "y": 182 }, { "x": 90, "y": 186 }]],
            "merchant_phone": [[{ "x": 97, "y": 67 }, { "x": 210, "y": 67 }, { "x": 210, "y": 84 }, { "x": 97, "y": 84 }]],
            "merchant_address": [[{ "x": 83, "y": 91 }, { "x": 210, "y": 90 }, { "x": 210, "y": 104 }, { "x": 83, "y": 104 }], [{ "x": 89, "y": 102 }, { "x": 212, "y": 101 }, { "x": 212, "y": 114 }, { "x": 89, "y": 116 }]]
        }
    }]
};


export default function DataDis() {

    const [dataExist, setDataExist] = useState(true);
    const [receiptContentIndex, setReceiptContentIndex] = useState(0);
    const [receiptsData, setReceiptsData] = useState(null);
    const COLORS = ['#4682B4', '#82ca9d', '#FFA500', '#B0C4DE', '#6c757d', '#28a745', '#f8f9fa', '#343a40', '#FFFFFF'];
    const getReceipts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/receipts`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                      },
                    // Include headers if required by your API
                });

                if (response.ok) {
                    const data = await response.json();
                    setReceiptsData(data)
                    console.log('get data:', data);
                    // Handle the response data
                } else {
                    console.error('get data failed');
                }
            } catch (error) {
                console.error('Error get data', error);
            }
        
    };
    useEffect(()=>{
        getReceipts()
    },[])



    return (
        <div>
            {!dataExist &&
                <div>
                    <img src={backgroundImg} alt="Grocery Img" style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '600px',
                        maxHeight: '337.5px',
                        marginBottom: '20px'
                    }} />
                    <Box>
                        <h2>Sorry, no data available...</h2>
                    </Box>
                </div>
            }

            {dataExist &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: { xs: '100%', md: '60%' },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <Paper sx={{ width: { xs: '100%', md: '100%' }, margin: '1%', padding: '1%', backgroundColor: '#F0F8FF', borderRadius: 2, }}>
                                <AreaChartUseThis
                                    data={data}
                                    style={{
                                        width: { xs: '100%', md: '100%' },
                                        height: 300,
                                    }}
                                />
                            </Paper>
                        </Box>
                        {/* <Paper sx={{ width: { xs: '100%', md: '100%' }, margin: '1%', padding: '1%', backgroundColor: '#F0F8FF', borderRadius: 2, }}> */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <VirtualizedList style={{ xs: '100%', md: '100%', overflow: 'hidden', backgroundColor: '#F0F8FF', padding: '1%', margin: '1%' }} data={receiptsData} setReceiptContentIndex={setReceiptContentIndex}/>
                            <StickyHeadTable style={{
                                xs: '100%', md: '100%', overflow: 'hidden', backgroundColor: '#F0F8FF', padding: '1%', margin: '1%', '& .MuiTableCell-root': {
                                    wordWrap: 'break-word',
                                    maxWidth: '335px',
                                    overflow: 'hidden',
                                }
                            }} dataT={receiptsData?receiptsData[receiptContentIndex]:{}} />
                        </Box>
                        {/* </Paper> */}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: { xs: '100%', md: '40%' },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <Paper sx={{
                                borderRadius: 2,
                                width: { xs: '100%', md: '100%' },
                                backgroundColor: '#F0F8FF',
                                padding: '1.5%',
                                margin: '1.5%'
                            }}>
                                <RadarChartUseThis data={dataR} style={{ width: '100%', height: 300 }} />
                            </Paper>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                        }}>
                            <Paper sx={{
                                borderRadius: 2,
                                width: { xs: '100%', md: '100%' },
                                backgroundColor: '#F0F8FF',
                                padding: '1.5%',
                                margin: '1.5%'
                            }}>
                                <PieChartUseThis data={[
                                    { name: 'Grocery', value: 400 },
                                    { name: 'Electronic', value: 300 },
                                    { name: 'Home&Garden', value: 300 },
                                    { name: 'Other', value: 200 },
                                ]} />
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            }
        </div>
    );
}