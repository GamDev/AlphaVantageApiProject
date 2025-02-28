import { Controller, Get, Query } from "@nestjs/common";
import { AlphaVantageService } from "./alpha-vantage.service";
import { HoldingDto } from "./DTOs/holding.dto";
import { CompanyOverviewDto } from "./DTOs/CompanyOverview.dto";

@Controller("stocks")
export class AlphaVantageController {
  constructor(private readonly alphaVantageService: AlphaVantageService) {}

  @Get("company")
  async getCompanyOverview(@Query("symbol") symbol: string) : Promise<CompanyOverviewDto> {
    return this.alphaVantageService.getCompanyOverview(symbol);
  }

  @Get("intraday")
  async getIntradayData(@Query("symbol") symbol: string, @Query("interval") interval: string = "60min") {
    return this.alphaVantageService.getIntradayData(symbol, interval);
  }
  @Get("etf-holdings")
  async getETFHoldings(@Query("symbol") symbol: string): Promise<HoldingDto[]> {
    return this.alphaVantageService.getETFHoldings(symbol);
  }
}
