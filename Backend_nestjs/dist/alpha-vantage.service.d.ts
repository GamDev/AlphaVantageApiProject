import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { HoldingDto } from "./DTOs/holding.dto";
import { CompanyOverviewDto } from "./DTOs/CompanyOverview.dto";
import { IntradayStockDataDto } from "./DTOs/IntradayStockData.dto";
export declare class AlphaVantageService {
    private readonly httpService;
    private readonly configService;
    readonly baseUrl: string;
    readonly apiKey: string;
    constructor(httpService: HttpService, configService: ConfigService);
    getETFHoldings(symbol: string): Promise<HoldingDto[]>;
    getCompanyOverview(symbol: string): Promise<CompanyOverviewDto>;
    getIntradayData(symbol: string, interval?: string): Promise<IntradayStockDataDto[]>;
}
