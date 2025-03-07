import { useContext, useEffect, useState } from 'react'
import { usercontext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import Header from '../header';
import { TypeAnimation } from 'react-type-animation';

import { Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip,
  Legend, BarElement, ArcElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

import Plot from 'react-plotly.js';
import Subfooter from '../subfooter'
import Footer from '../footer';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const VisualisationPage = () => {
  const { ready,user,isAdmin } = useContext(usercontext);
  const [details, setdetails] = useState([]);
  const [criteria, setcriteria] = useState('Past-Years');
  const [Month,setMonth] = useState(1);
  const [Year,setYear] = useState(2024);

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Complaints',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.2,
      },
    ],
  });
  const [options,setoptions] = useState({
    scales: {
      x: {
        title: {
          display: true,
          text: 'Past-Years',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Complaints',
        },
      },
    },
    animation: {
      duration: 3000,
      easing: 'easeOutElastic',  
      delay: 500,
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Complaints Over Time',
        font:{
          size:24,
        },
      },
    },
  })

  const [doughnutChartData, setdoughnutChartData] = useState({
    labels: [
      'Male',
      'Female',
      'Others'
    ],
    datasets: [{
      label: 'Gender Comparison',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 18
    }]
  });

  const [doughnutChartData2, setdoughnutChartData2] = useState([{
    values: [35, 30, 34, 1],
    labels: ['Pending', 'Active', 'Closed', 'Terminated'],
    text: 'Status',
    textposition: 'inside',
    domain: {column: 1},
    name: 'Status',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  }]);
  var layout = {
    title: 'Complaints Status Comparison',
    font:{
      size:13,
    },
    annotations: [
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'Status',
        x: 0.50,
        y: 0.5
      }
    ],
    height: 430,
    width: 520,
    showlegend: true,
    grid: {rows: 1, columns: 1}
  };

  const [barChartData, setbarChartData] = useState({
    labels: ['Threat','Theft','Scam','Hate-Speech','Violence','Bribery','Account-Hacking','Property','Child-Marriage'], // X-axis labels
    datasets: [
      {
        label: 'Cases',
        data: [12, 19, 3, 5, 2, 3, 1, 5, 2], // Y-axis data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)', // Orange
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 206, 86, 1)', // Yellow
          'rgba(75, 192, 192, 1)', // Green
          'rgba(153, 102, 255, 1)', // Purple
          'rgba(255, 159, 64, 1)', // Orange
        ],
        borderWidth: 1, 
        borderRadius: 16, 
        barPercentage: 0.8, 
      },
    ],
  });
  const options4 = {
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at 0
        title: {
          display: true,
          text: 'Number of Cases',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Types Of Cases',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Complaints Comparison By Case Types',
        font: {
          size: 24,
        },
      },
    },
    animation: {
      duration: 2000, // Animation duration for the bars
      easing: 'easeInOutBounce', // Smooth animation effect
    },
    responsive: true,
  };

  const [scatterData, setScatterData] = useState([]);
  var layout2 ={
    title: 'Complaint Resolution Time (Closed Complaints)',
    xaxis: {
      title: 'Complaint Type',
    },
    yaxis: {
      title: 'Resolution Time (Days)',
    },
    height: 600,
    width: 1150,
    showlegend: true,  // Enable the legend
  }

  useEffect(()=>{
    axios.get('/allComplaints').then(({data})=>{
      setdetails(data);
      setLineChartData({
        labels: labelByCriteria('Past-Years'),
        datasets: [
          {
            label: 'Number of Complaints',
            data: complaintByCriteria({Criteria:'Past-Years',data:data}),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.2,
          },
        ],
      });

      setdoughnutChartData({
      labels: [
        'Male',
        'Female',
        'Others'
      ],
      datasets: [{
        label: 'Gender Comparison',
        data: genderCount(data),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 18
      }]
      })

      setdoughnutChartData2([{
        values: StatusPecentage(data),
        labels: ['Pending', 'Active', 'Closed', 'Terminated'],
        text: 'Status',
        textposition: 'inside',
        domain: {column: 1},
        name: 'Status',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }]);

      setbarChartData({
        labels: ['Threat','Theft','Scam','Hate-Speech','Violence','Bribery','Account-Hacking','Property','Child-Marriage'], // X-axis labels
        datasets: [
          {
            label: 'Cases',
            data: CountCases(data), // Y-axis data
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)', // Red
              'rgba(54, 162, 235, 0.6)', // Blue
              'rgba(255, 206, 86, 0.6)', // Yellow
              'rgba(75, 192, 192, 0.6)', // Green
              'rgba(153, 102, 255, 0.6)', // Purple
              'rgba(255, 159, 64, 0.6)', // Orange
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Red
              'rgba(54, 162, 235, 1)', // Blue
              'rgba(255, 206, 86, 1)', // Yellow
              'rgba(75, 192, 192, 1)', // Green
              'rgba(153, 102, 255, 1)', // Purple
              'rgba(255, 159, 64, 1)', // Orange
            ],
            borderWidth: 1, 
            borderRadius: 16, 
            barPercentage: 0.8, 
          },
        ],
      })

      const resolvedComplaints = data.filter(complaint => complaint.status === 'Closed');
      const groupedData = {};
      
      resolvedComplaints.forEach(complaint => {
        const resolutionTime = calculateResolutionTime(complaint.registrationDate, complaint.lastUpdateDate);
        Object.keys(complaint.tags).forEach((tag)=>{
          if (!groupedData[tag]) {
            groupedData[tag] = { x: [], y: [], name: tag };
          }
          groupedData[tag].x.push(tag);
          groupedData[tag].y.push(resolutionTime);
        })
      });
      setScatterData(Object.values(groupedData));
      console.log(Object.values(groupedData));
    })
  },[]);

  function complaintByCriteria({Criteria,data,year,month}){
    let complaint = (data ? data : details);
    if(Criteria == 'Year-Wise'){
      if(!year) year = 2024;
      let count = Array(12).fill(0);

      for(let comp of complaint){
        let timestamp = comp.registrationDate.split('-');
        let month = Number(timestamp[1]), Year = Number(timestamp[0]);
        if(Year == year) count[month-1]++;
      }
      return count;
    }

    else if(Criteria == 'Month-Wise'){
      if(!year) year = 2024;
      if(!month) month = 1;
      let count = Array(31).fill(0);
    
      for(let comp of complaint){
        let timestamp = comp.registrationDate.split('-');
        let Day = Number(timestamp[2]), Month = Number(timestamp[1]), Year = Number(timestamp[0]);
        if(Year==year && Month==month) count[Day-1]++;
      }
      return count;
    }

    else if(Criteria == 'Past-Years'){
      let count = Array(5).fill(0);
      for(let comp of complaint){
        let year = Number(comp.registrationDate.split('-')[0]);
        count[year - 2019 - 1]++;
      }
      return count;
    }

    else{
      let count = Array(24).fill(0);
      for(let comp of complaint){
        let time = Number(comp.startTime.split(':')[0]);
        count[time]++;
      }
      return count;
    }
  }

  function labelByCriteria(Criteria){
    if(Criteria == 'Year-Wise'){
      setoptions({
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year-Wise',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Complaints',
            },
          },
        },
        animation: {
          duration: 3000,
          easing: 'easeOutElastic',  
          delay: 500,
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Complaints Over Time',
            font:{
              size:24,
            },
          },
        },
      })
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
    }

    else if(Criteria == 'Month-Wise'){
      setoptions({
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month-Wise',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Complaints',
            },
          },
        },
        animation: {
          duration: 3000,
          easing: 'easeOutElastic',  
          delay: 500,
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Complaints Over Time',
            font:{
              size:24,
            },
          },
        },
      })
      return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    }

    else if(Criteria == 'Past-Years'){
      setoptions({
        scales: {
          x: {
            title: {
              display: true,
              text: 'Past-Years',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Complaints',
            },
          },
        },
        animation: {
          duration: 3000,
          easing: 'easeOutElastic',  
          delay: 500,
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Complaints Over Time',
            font:{
              size:24,
            },
          },
        },
      })
      return [2020,2021,2022,2023,2024];
    }

    else{
      setoptions({
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time-Wise',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Complaints',
            },
          },
        },
        animation: {
          duration: 3000,
          easing: 'easeOutElastic',  
          delay: 500,
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Complaints Over Time',
            font:{
              size:24,
            },
          },
        },
      })
      return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    }
  }

  function genderCount(data){
    let male = 0, female = 0, others = 0;
    for(let comp of data){
      if(comp.gender == 'Male') male++;
      else if(comp.gender == 'Female') female++;
      else others++;
    }
    return [male,female,others];
  }
  
  function StatusPecentage(data){
    let pending = 0, active = 0, closed = 0, terminated = 0;
    for(let comp of data){
      if(comp.status == 'Active') active++;
      else if(comp.status == 'Closed') closed++;
      else if(comp.status == 'Pending') pending++;
      else terminated++;
    }
    return [pending/(data.length),active/(data.length),closed/(data.length),terminated/data.length];
  }

  function CountCases(data){
    let threat = 0, theft = 0, scam = 0, hate = 0, bribe = 0;
    let violence = 0, child = 0, property = 0, account = 0;

    for(let comp of data){
      if(comp.tags.scam) scam++;
      else if(comp.tags.threat) threat++;
      else if(comp.tags.theft) theft++;
      else if(comp.tags.hateSpeech) hate++;
      else if(comp.tags.bribery) bribe++;
      else if(comp.tags.violence) violence++;
      else if(comp.tags.childMarriage) child++;
      else if(comp.tags.property) property++;
      else account++;
    }
    return [threat,theft,scam,hate,violence,bribe,account,property,child];
  }

  function calculateResolutionTime(startTime, endTime){
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = (end - start) / (1000 * 60 * 60 * 24); //
    return duration;
  }

  if(ready && !user) {return <Navigate to={'/'}/>}
  if(ready && user && !isAdmin) {return <Navigate to={'/'}/>}

  if(ready && user && isAdmin){
    return (
    <div className='bg-zinc-50 '>
      <Header/>
      <div className=' w-[750px] p-1 flex justify-center text-gray-600 font-semibold m-5 ml-[350px]'>
        <TypeAnimation
        sequence={['We thrive to create a peaceful Society .', 2000, 'Our aim is to make citizen life easy .', 2000, 'Analysing data is a key to implement our goals .', 2000]}
        style={{ fontSize: '2em' }}
        repeat={Infinity} speed={50}
        />
      </div>

      <div className='mt-12 flex flex-col gap-10 mb-16'>
        <div className='relative bg-white h-[600px] w-[1200px] ml-40 border shadow-lg shadow-gray-400 rounded-3xl flex justify-center p-2 hover:scale-105 cursor-pointer transition-all'>
          <Line data={lineChartData} options={options} />

          <label className='absolute top-3 right-3 hover:cursor-pointer flex place-items-center gap-4 border p-2 shadow-md rounded-xl'>

            <p className=' font-medium'>Criteria</p>
            <select className='p-1 rounded-xl hover:cursor-pointer' onChange={(e) => {
                const selectedCriteria = e.target.value; 
                setcriteria(selectedCriteria);
                setLineChartData({
                  labels: labelByCriteria(selectedCriteria),
                  datasets: [
                    {
                      label: 'Number of Complaints',
                      data: complaintByCriteria({Criteria:selectedCriteria}),
                      fill: false,
                      borderColor: 'rgba(75,192,192,1)',
                      tension: 0.2,
                    },
                  ],
                });

                setoptions({scales: {
                  x: {
                    title: {
                      display: true,
                      text: e.target.value,
                    },
                  },
                  y: {
                    beginAtZero: true,  // Ensure y-axis starts at 0
                    title: {
                      display: true,
                      text: 'Number of Complaints',
                    },
                  },
                },
                animation: {
                  duration: 3000,
                  easing: 'easeOutElastic',  
                  delay: 500,
                },
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Complaints Over Time',
                    font:{
                      size:24,
                    },
                  },
                },})

              }}>
              <option value={'Past-Years'}>Past Years</option>
              <option value={'Year-Wise'}>Year-Wise</option>
              <option value={'Month-Wise'}>Month-Wise</option>
              <option value={'Time-Wise'}>Time-Wise</option>
            </select>

            <select className={`Years p-1 rounded-xl hover:cursor-pointer ${(criteria=='Year-Wise' || criteria=='Month-Wise' || criteria=='Day-Wise') ? '' : 'hidden'}`} onChange={(e)=>{
              setYear(e.target.value);
              setLineChartData({
                labels: labelByCriteria("Year-Wise"),
                datasets: [
                  {
                    label: 'Number of Complaints',
                    data: complaintByCriteria({Criteria:"Year-Wise",month:Month,year: e.target.value}),
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.2,
                  },
                ],
              });
            }}>
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
            </select>

            <select className={`Months p-1 rounded-xl hover:cursor-pointer ${criteria=='Month-Wise' || criteria=='Day-Wise' ? '' : 'hidden'}`} onChange={(e)=>{
              setMonth(e.target.value);
              setLineChartData({
                labels: labelByCriteria("Month-Wise"),
                datasets: [
                  {
                    label: 'Number of Complaints',
                    data: complaintByCriteria({Criteria:"Month-Wise",year:Year,month:e.target.value}),
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.2,
                  },
                ],
              });
            }}>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
            
          </label>
        </div>

        <div className='flex place-items-center'>
          <div className='relative bg-white h-[450px] w-[500px] border shadow-lg shadow-gray-400 rounded-3xl flex flex-col gap-5 justify-center place-items-center p-16 ml-40 hover:scale-105 cursor-pointer transition-all'>
            <p className='text-lg'>Complaints Count By Gender</p>
            <p className='absolute top-[55%] text-xl'>Gender</p>
            <Doughnut data={doughnutChartData}/>
          </div>

          <div className='bg-white border shadow-lg shadow-gray-400 rounded-3xl flex justify-center ml-40 m-10 p-2 hover:scale-105 cursor-pointer transition-all'>
            <Plot data={doughnutChartData2} layout={layout} config={{ responsive: true, displaylogo: false}}/>
          </div>
        </div>

        <div className='bg-white h-[600px] w-[1200px] ml-40 border shadow-lg shadow-gray-400 rounded-3xl flex justify-center p-2 hover:scale-105 cursor-pointer transition-all'>
          <Bar data={barChartData} options={options4}/>
        </div>

        <div className='h-[620px] w-[1200px] p-2 pb-10 bg-white mt-10 ml-40 border shadow-lg shadow-gray-400 rounded-3xl flex justify-center hover:scale-105 cursor-pointer transition-all'>
          <Plot
            data={scatterData.map(dataset => ({
              ...dataset,
              mode: 'markers',
              marker: {
                size: 12,
                color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
                line: {
                  color: 'rgba(93, 164, 214, 1)',
                  width: 2,
                },
              },
              type: 'scatter',
            }))}
          layout={layout2} config={{displaylogo: false}}
          />
        </div>
      </div>

      <Subfooter/>
      <Footer/>
    </div>
    )
  }
}
