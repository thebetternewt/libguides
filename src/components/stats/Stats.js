import React, { Component } from 'react';
import axios from 'axios';
import { Scatter, Bar, Line } from 'react-chartjs-2';
import Spinner from '../common/Spinner';
import styled from 'styled-components';

class Stats extends Component {
  state = {
    chartData: null,
    chartOptions: null,
    loading: true
  };

  componentDidMount = () => {
    const countHitUrl = `https://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6
    &sort_by=count_hit`;

    axios.get(countHitUrl).then(res => {
      console.log(res.data);
      const labels = res.data.map(g => g.name).slice(0, 20);
      const data = res.data.map(g => parseInt(g.count_hit, 0)).slice(0, 20);

      const alphas = Array.from(Array(20), (x, i) => i / 20);
      const colors = alphas.map(a => `rgba(102, 0, 0, ${a}`).reverse();
      console.log(colors);

      console.log(labels);
      console.log(data);

      this.setState({
        chartData: {
          labels,
          datasets: [
            {
              label: 'Hit Count',
              data,
              backgroundColor: [...colors]
            }
          ]
        },
        chartOptions: {
          title: {
            display: true,
            text: 'Top 20 Guides by Hit Count',
            fontSize: 24,
            fontFamily: "'Montserrat', 'Helvetica', Arial, sans-serif",
            padding: 15
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false
                }
              }
            ]
          },
          responsive: true
        },
        loading: false
      });
    });
  };

  render() {
    const { loading, chartData, chartOptions } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <ChartContainer>
        <Bar
          data={chartData}
          width={100}
          options={{
            ...chartOptions,
            maintainAspectRatio: false
          }}
        />
      </ChartContainer>
    );
  }
}

export default Stats;

// Styled components

const ChartContainer = styled.div`
  height: 300px;
  margin: 2rem 0;
`;
