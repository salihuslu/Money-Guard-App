import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import css from './ChartDoughnut.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    cutout: '75%',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    return `${label}: ₴ ${Math.abs(value).toFixed(2)}`;
                },
            },
        },
    },
};

function PieChart({ data, expenseTotal, incomeTotal }) {
    const doughnutData = useMemo(
        () => ({
            labels: Array.isArray(data) ? data.map(expense => expense.name) : [],
            datasets: [
                {
                    data: Array.isArray(data) && data.length > 0 ? data.map(expense => expense.total) : [0],
                    backgroundColor: Array.isArray(data) ? data.map(expense => expense.color) : [],
                    borderColor: Array.isArray(data) ? data.map(expense => expense.color) : [],
                    borderWidth: 1,
                    borderJoinStyle: 'round',
                    borderAlign: 'inner',
                },
            ],
        }),
        [data]
    );

    const renderContent = () => {
        if (!expenseTotal && !incomeTotal) {
            return (
                <div className={css.emptyState}>
                    <p>Add some expenses and incomes to see the chart</p>
                    <p>Your balance is ₴ {Math.abs(expenseTotal).toFixed(2)}</p>
                </div>
            );
        }

        if (!expenseTotal && incomeTotal) {
            return (
                <div className={css.emptyState}>
                    <p>Add some expenses</p>
                    <p>Your income is ₴ {Math.abs(incomeTotal).toFixed(2)}</p>
                </div>
            );
        }

        return (
            <div className={css.chartContainer}>
                <div className={css.balance}>₴ {Math.abs(expenseTotal).toFixed(2)}</div>
                <div className={css.chart}>
                    <Doughnut data={doughnutData} options={options} />
                </div>
            </div>
        );
    };

    return <div className={css.doughnut}>{renderContent()}</div>;
}

PieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
        })
    ),
    expenseTotal: PropTypes.number,
    incomeTotal: PropTypes.number,
};

PieChart.defaultProps = {
    data: [],
    expenseTotal: 0,
    incomeTotal: 0,
};

export default memo(PieChart);