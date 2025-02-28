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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaVantageController = void 0;
const common_1 = require("@nestjs/common");
const alpha_vantage_service_1 = require("./alpha-vantage.service");
let AlphaVantageController = class AlphaVantageController {
    alphaVantageService;
    constructor(alphaVantageService) {
        this.alphaVantageService = alphaVantageService;
    }
    async getCompanyOverview(symbol) {
        return this.alphaVantageService.getCompanyOverview(symbol);
    }
    async getIntradayData(symbol, interval = "60min") {
        return this.alphaVantageService.getIntradayData(symbol, interval);
    }
    async getETFHoldings(symbol) {
        return this.alphaVantageService.getETFHoldings(symbol);
    }
};
exports.AlphaVantageController = AlphaVantageController;
__decorate([
    (0, common_1.Get)("company"),
    __param(0, (0, common_1.Query)("symbol")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlphaVantageController.prototype, "getCompanyOverview", null);
__decorate([
    (0, common_1.Get)("intraday"),
    __param(0, (0, common_1.Query)("symbol")),
    __param(1, (0, common_1.Query)("interval")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AlphaVantageController.prototype, "getIntradayData", null);
__decorate([
    (0, common_1.Get)("etf-holdings"),
    __param(0, (0, common_1.Query)("symbol")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlphaVantageController.prototype, "getETFHoldings", null);
exports.AlphaVantageController = AlphaVantageController = __decorate([
    (0, common_1.Controller)("stocks"),
    __metadata("design:paramtypes", [alpha_vantage_service_1.AlphaVantageService])
], AlphaVantageController);
//# sourceMappingURL=alpha-vantage.controller.js.map