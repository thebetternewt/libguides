import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
import Spinner from '../common/Spinner';
import {
  getAllGuides,
  getGuidesByHitCount,
  getGuidesByUpdatedDate
} from '../../store/actions/statsActions';

class Stats extends Component {
  componentDidMount = () => {
    this.props.getAllGuides();
    this.props.getGuidesByHitCount();
    this.props.getGuidesByUpdatedDate();
  };

  generatePublishedStatusChartInfo = guidesList => {
    const labels = ['Unpublished', 'Published', 'Private', 'Submit for Review'];

    // Get counts of publication statuses
    const unpublished = guidesList.filter(g => g.status === '0').length;
    const published = guidesList.filter(g => g.status === '1').length;
    const privateStatus = guidesList.filter(g => g.status === '2').length;
    const submitForReview = guidesList.filter(g => g.status === '3').length;

    const data = [unpublished, published, privateStatus, submitForReview];

    // Generate rgba values for chart colors
    const colors = [
      'rgba(230, 0, 0, 0.3)',
      'rgba(0, 0, 230, 0.3)',
      'rgba(0, 249, 0, 0.3)',
      'rgba(230, 230, 0, 0.3)'
    ];

    // Define chart data and option attributes
    const publishedStatusChartData = {
      labels,
      datasets: [
        {
          label: 'Published Status',
          data,
          backgroundColor: [...colors]
        }
      ]
    };
    const publishedStatusChartOptions = {
      title: {
        display: true,
        text: 'Count of Guides by Publication Status',
        fontSize: 24,
        fontFamily: "'Montserrat', 'Helvetica', Arial, sans-serif",
        padding: 15
      },
      legend: {
        display: true,
        position: 'bottom'
      },

      responsive: true
    };

    return { publishedStatusChartData, publishedStatusChartOptions };
  };

  generateCountHitChartInfo = guidesList => {
    const labels = guidesList.map(g => g.name);
    const data = guidesList.map(g => parseInt(g.count_hit, 0));

    // Generate rgba values for chart colors
    const alphas = Array.from(Array(20), (x, i) => i / 20);
    const colors = alphas.map(a => `rgba(102, 0, 0, ${a}`).reverse();

    // Define chart data and option attributes
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
    // Calculate number of days since last updated
    const data = guidesList.map(g => moment().diff(g.updated, 'days'));

    // Generate rgba values for chart colors
    const alphas = Array.from(Array(20), (x, i) => i / 20);
    const colors = alphas.map(a => `rgba(102, 0, 0, ${a}`).reverse();

    // Define chart data and option attributes
    const updatedDateChartData = {
      labels,
      datasets: [
        {
          label: 'Days since last updated',
          data,
          backgroundColor: [...colors]
        }
      ]
    };
    const updatedDateChartOptions = {
      title: {
        display: true,
        text: 'Days Since Last Update (Top 20)',
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
      publishedStatusChartData,
      publishedStatusChartOptions
    } = this.generatePublishedStatusChartInfo(this.props.allGuides);
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
        <ChartContainer>
          <Pie
            data={publishedStatusChartData}
            width={100}
            options={{
              ...publishedStatusChartOptions,
              maintainAspectRatio: false
            }}
          />
        </ChartContainer>
      </div>
    );
  }
}

Stats.propTypes = {
  getAllGuides: PropTypes.func.isRequired,
  getGuidesByHitCount: PropTypes.func.isRequired,
  getGuidesByUpdatedDate: PropTypes.func.isRequired,
  allGuides: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  guidesByHitCount: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  guidesByUpdatedDate: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  allGuides: state.stats.allGuides,
  guidesByHitCount: state.stats.guidesByHitCount,
  guidesByUpdatedDate: state.stats.guidesByUpdatedDate,
  loading: state.stats.loading
});

export default connect(
  mapStateToProps,
  { getGuidesByHitCount, getGuidesByUpdatedDate, getAllGuides }
)(Stats);

// Styled components

const ChartContainer = styled.div`
  height: 300px;
  margin: 2rem 0;
`;
