import { AlphaVantageService } from "./alpha-vantage.service";
import { HoldingDto } from "./DTOs/holding.dto";
import { CompanyOverviewDto } from "./DTOs/CompanyOverview.dto";
export declare class AlphaVantageController {
    private readonly alphaVantageService;
    constructor(alphaVantageService: AlphaVantageService);
    getCompanyOverview(symbol: string): Promise<CompanyOverviewDto>;
    getIntradayData(symbol: string, interval?: string): Promise<import("./DTOs/IntradayStockData.dto").IntradayStockDataDto[]>;
    getETFHoldings(symbol: string): Promise<HoldingDto[]>;
}
