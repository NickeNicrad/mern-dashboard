"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_js_1 = __importDefault(require("./routes/client.js"));
const client_js_2 = __importDefault(require("./routes/client.js"));
const general_js_1 = __importDefault(require("./routes/general.js"));
const management_js_1 = __importDefault(require("./routes/management.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/sales", client_js_1.default);
app.use("/client", client_js_2.default);
app.use("/general", general_js_1.default);
app.use("/management", management_js_1.default);
// app.use("/client", clientRoutes);