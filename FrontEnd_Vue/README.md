# frontend

### Compiles and hot-reloads for development
```
npm run serve
```

### Components
** StockDashBoard.vue ** :  this component call nest js api callled "etf-holdings" the api return stock info.  Symbol ,  Description  Weight (%) . the stocks data is displayed in table . then there is View action in this table, when you click on it, the route to stock details component,  it will display the details infomation about the stock, e.g company overview. and other info. 

**  stockdetails.vue ** : this compoent basically load two component  called CompanyOverview.vue. and stockIntradayChart.vue



