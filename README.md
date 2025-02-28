Technologies : Vue js Front end and nest js backend.

**Architecture :** 

 I have developed an apis in nex tjs that fetches data from alpha vantage api.

Back end :  
AlphaVantageService  : this class calls the api and returns the data .   
AlphaVantageController : a controller class that calls AlphaVantageService. This call has an api endpoint defined. Our front end will call these apis.

Front end   
 On the front end side I have different components to render data.   
  E.g StockDashboard :  list all stocks.  
        StockIntradayChart . display stock data in graphs and bar charts.  
       StockDetails  :  display company info, 

How to run the projects.  
I have two separate projects. Just install the vue and nest js . Open both projects in VS CODE and open the terminal pass the command. 

Vue installation : open the terminal  and npm install \-g @vue/cli   
Nest js  installation: open the terminal and npm install \-g @nestjs/cli   

**Enable CORS** : right now on my side nest js server is running on port 3000\.   
Check in the main.ts file in the nestjs project.   

**.env file** : in nest js project open this file, and replace the alpha vantage api key. You will get a new Key from the Alpha vantage website.

# frontend

### Compiles and hot-reloads for development
```
npm run serve
```

### Components
** StockDashBoard.vue ** :  this component call nest js api callled "etf-holdings" the api return stock info.  Symbol ,  Description  Weight (%) . the stocks data is displayed in table . then there is View action in this table, when you click on it, the route to stock details component,  it will display the details infomation about the stock, e.g company overview. and other info. 

**  stockdetails.vue ** : this compoent basically load two component  called CompanyOverview.vue. and stockIntradayChart.vue



