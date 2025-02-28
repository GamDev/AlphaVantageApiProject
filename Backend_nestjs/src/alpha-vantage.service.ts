import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { HoldingDto } from "./DTOs/holding.dto";
import { CompanyOverviewDto } from "./DTOs/CompanyOverview.dto";
import { IntradayStockDataDto } from "./DTOs/IntradayStockData.dto";

@Injectable()
export class AlphaVantageService {
    readonly baseUrl: string;
    readonly apiKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.get<string>("ALPHA_VANTAGE_BASE_URL") as string;
        this.apiKey = this.configService.get<string>("ALPHA_VANTAGE_API_KEY") as string;
    }
    async getETFHoldings(symbol: string): Promise<HoldingDto[]> {
        const url = `${this.baseUrl}?function=ETF_PROFILE&symbol=${symbol}&apikey=${this.apiKey}`;
    
        try {
          const response = await axios.get(url);
          const data = response.data;
    
          if (!data || !data.holdings) {
            throw new HttpException("Holdings data not found", HttpStatus.BAD_REQUEST);
          }
    
          return data.holdings.map((holding: any) => ({
            symbol: holding.symbol,
            description: holding.description,
            weight: parseFloat(holding.weight) || 0, // Ensure weight is a number
          }));
        } catch (error) {
          throw new HttpException("Error fetching ETF holdings", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    async getCompanyOverview(symbol: string): Promise<CompanyOverviewDto> {
        try {
            const url = `${this.baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`;
            console.log(`Fetching Company Overview: ${url}`);

            const response = await axios.get(url);

            if (!response.data || response.data.Note) {
                throw new Error(`Alpha Vantage API limit exceeded`);
            }

            console.log("API Response:", response.data);
            const companyOverview: CompanyOverviewDto = {
                symbol: response.data.Symbol || "", // Ensure default values
                assetType: response.data.AssetType || "",
                name: response.data.Name || "",
                description: response.data.Description || "",
                sector: response.data.Sector || "",
                industry: response.data.Industry || "",
                address: response.data.Address || "",
                marketCapitalization: response.data.MarketCapitalization || "",
                ebitda: response.data.EBITDA || "",
            };
            // Convert response data to DTO instance
            return  companyOverview;
        } catch (error) {
            console.error("Error fetching company overview:", error);
            throw new HttpException(
                error.response?.data?.message || "Failed to fetch company overview",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getIntradayData(symbol: string, interval: string = "60min"): Promise<IntradayStockDataDto[]> {
        try {
          const url = `${this.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.apiKey}`;
          console.log(`Fetching Intraday Data: ${url}`);
      
          const response = await axios.get(url);
      
          if (!response.data || response.data["Error Message"]) {
            throw new Error("Invalid response from Alpha Vantage API");
          }
      
          // Extract time series data
          const timeSeries = response.data[`Time Series (${interval})`];
      
          if (!timeSeries) {
            throw new Error("Time Series data not found in response.");
          }
      
          // Convert time series object into an array
          const formattedData: IntradayStockDataDto[] = Object.keys(timeSeries).map((timestamp) => ({
            timestamp,
            open: parseFloat(timeSeries[timestamp]["1. open"]),
            high: parseFloat(timeSeries[timestamp]["2. high"]),
            low: parseFloat(timeSeries[timestamp]["3. low"]),
            close: parseFloat(timeSeries[timestamp]["4. close"]),
            volume: parseInt(timeSeries[timestamp]["5. volume"]),
          }));
      
          return formattedData;
        } catch (error) {
          console.error("Error fetching intraday data:", error.message);
          throw new HttpException(
            error.message || "Failed to fetch intraday data",
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      }
      
}
