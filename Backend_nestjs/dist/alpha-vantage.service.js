"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaVantageService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const axios_2 = require("axios");
let AlphaVantageService = class AlphaVantageService {
    httpService;
    configService;
    baseUrl;
    apiKey;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.baseUrl = this.configService.get("ALPHA_VANTAGE_BASE_URL");
        this.apiKey = this.configService.get("ALPHA_VANTAGE_API_KEY");
    }
    async getETFHoldings(symbol) {
        const url = `${this.baseUrl}?function=ETF_PROFILE&symbol=${symbol}&apikey=${this.apiKey}`;
        try {
            const response = await axios_2.default.get(url);
            const data = response.data;
            if (!data || !data.holdings) {
                throw new common_1.HttpException("Holdings data not found", common_1.HttpStatus.BAD_REQUEST);
            }
            return data.holdings.map((holding) => ({
                symbol: holding.symbol,
                description: holding.description,
                weight: parseFloat(holding.weight) || 0,
            }));
        }
        catch (error) {
            throw new common_1.HttpException("Error fetching ETF holdings", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCompanyOverview(symbol) {
        try {
            const url = `${this.baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`;
            console.log(`Fetching Company Overview: ${url}`);
            const response = await axios_2.default.get(url);
            if (!response.data || response.data.Note) {
                throw new Error(`Alpha Vantage API limit exceeded`);
            }
            console.log("API Response:", response.data);
            const companyOverview = {
                symbol: response.data.Symbol || "",
                assetType: response.data.AssetType || "",
                name: response.data.Name || "",
                description: response.data.Description || "",
                sector: response.data.Sector || "",
                industry: response.data.Industry || "",
                address: response.data.Address || "",
                marketCapitalization: response.data.MarketCapitalization || "",
                ebitda: response.data.EBITDA || "",
            };
            return companyOverview;
        }
        catch (error) {
            console.error("Error fetching company overview:", error);
            throw new common_1.HttpException(error.response?.data?.message || "Failed to fetch company overview", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getIntradayData(symbol, interval = "60min") {
        try {
            const url = `${this.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.apiKey}`;
            console.log(`Fetching Intraday Data: ${url}`);
            const response = await axios_2.default.get(url);
            if (!response.data || response.data["Error Message"]) {
                throw new Error("Invalid response from Alpha Vantage API");
            }
            const timeSeries = response.data[`Time Series (${interval})`];
            if (!timeSeries) {
                throw new Error("Time Series data not found in response.");
            }
            const formattedData = Object.keys(timeSeries).map((timestamp) => ({
                timestamp,
                open: parseFloat(timeSeries[timestamp]["1. open"]),
                high: parseFloat(timeSeries[timestamp]["2. high"]),
                low: parseFloat(timeSeries[timestamp]["3. low"]),
                close: parseFloat(timeSeries[timestamp]["4. close"]),
                volume: parseInt(timeSeries[timestamp]["5. volume"]),
            }));
            return formattedData;
        }
        catch (error) {
            console.error("Error fetching intraday data:", error.message);
            throw new common_1.HttpException(error.message || "Failed to fetch intraday data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AlphaVantageService = AlphaVantageService;
exports.AlphaVantageService = AlphaVantageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AlphaVantageService);
//# sourceMappingURL=alpha-vantage.service.js.map