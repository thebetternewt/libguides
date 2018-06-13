import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar, Pie } from 'react-chartjs-2';
import Spinner from '../common/Spinner';
import {
  getGuidesByHitCount,
  getGuidesByUpdatedDate
} from '../../store/actions/statsActions';

class Stats extends Component {
  componentDidMount = () => {
    this.props.getGuidesByHitCount();
    this.props.getGuidesByUpdatedDate();
  };

  generateCountHitChartInfo = guidesList => {
    const labels = guidesList.map(g => g.name);
    const data = guidesList.map(g => parseInt(g.count_hit, 0));

    // Generate rgba values for chart colors
    const alphas = Array.from(Array(20), (x, i) => i / 20);
    const colors = alphas.map(a => `rgba(102, 0, 0, ${a}`).reverse();

    const countHitChartData = {
      labels,
      datasets: [
        {
          label: 'Hit Count',
          data,
          backgroundColor: [...colors]
        }
      ]
    };
    const countHitChartOptions = {
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
    };

    return { countHitChartData, countHitChartOptions };
  };

  generateUpdatedChartInfo = guidesList => {
    const labels = guidesList.map(g => g.name);
    const data = guidesList.map(g => new Date(g.updated));
    console.log(data);

    // Generate rgba values for chart colors
    const alphas = Array.from(Array(20), (x, i) => i / 20);
    const colors = alphas.map(a => `rgba(102, 0, 0, ${a}`).reverse();

    const updatedDateChartData = {
      labels,
      datasets: [
        {
          label: 'Last Updated Date',
          data,
          backgroundColor: [...colors]
        }
      ]
    };
    const updatedDateChartOptions = {
      title: {
        display: true,
        text: 'Top 20 Guides by Updated Date',
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
    };

    return { updatedDateChartData, updatedDateChartOptions };
  };

  render() {
    const {
      countHitChartData,
      countHitChartOptions
    } = this.generateCountHitChartInfo(this.props.guidesByHitCount);
    const {
      updatedDateChartData,
      updatedDateChartOptions
    } = this.generateUpdatedChartInfo(this.props.guidesByUpdatedDate);

    const { loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div>
        <ChartContainer>
          <Bar
            data={countHitChartData}
            width={100}
            options={{
              ...countHitChartOptions,
              maintainAspectRatio: false
            }}
          />
        </ChartContainer>
        <ChartContainer>
          <Bar
            data={updatedDateChartData}
            width={100}
            options={{
              ...updatedDateChartOptions,
              maintainAspectRatio: false
            }}
          />
        </ChartContainer>
      </div>
    );
  }
}

Stats.propTypes = {
  getGuidesByHitCount: PropTypes.func.isRequired,
  getGuidesByUpdatedDate: PropTypes.func.isRequired,
  guidesByHitCount: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  guidesByUpdatedDate: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  guidesByHitCount: state.stats.guidesByHitCount,
  guidesByUpdatedDate: state.stats.guidesByUpdatedDate,
  loading: state.stats.loading
});

export default connect(
  mapStateToProps,
  { getGuidesByHitCount, getGuidesByUpdatedDate }
)(Stats);

// Styled components

const ChartContainer = styled.div`
  height: 300px;
  margin: 2rem 0;
`;
