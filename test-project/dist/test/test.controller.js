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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const http_status_codes_1 = require("http-status-codes");
const create_test_dto_1 = require("./dto/create-test.dto");
const test_service_1 = require("./test.service");
const posts_service_1 = require("../posts/posts.service");
const createPost_dto_1 = require("../posts/dto/createPost.dto");
let TestController = class TestController {
    constructor(testService, postService) {
        this.testService = testService;
        this.postService = postService;
    }
    getTest() {
        return 'This is a test';
    }
    getStatus(response) {
        response.status(300).send('This is a mistake');
    }
    getPath(request) {
        return request.originalUrl;
    }
    async findAll(res) {
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .send({ message: http_status_codes_1.StatusCodes.OK, data: this.testService.findAll() });
        return this.testService.findAll();
    }
    getId(id) {
        return `Param id ${id}`;
    }
    create(createTestDTO) {
        this.testService.create(createTestDTO);
    }
    createNewPost(createPostDTO) {
        this.postService.create(createPostDTO);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], TestController.prototype, "getTest", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TestController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('path'),
    (0, common_1.HttpCode)(http_status_codes_1.StatusCodes.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], TestController.prototype, "getPath", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_test_dto_1.CreateTestDTO]),
    __metadata("design:returntype", Object)
], TestController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('createPost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPost_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "createNewPost", null);
TestController = __decorate([
    (0, common_1.Controller)('test'),
    __metadata("design:paramtypes", [test_service_1.TestService, posts_service_1.PostsService])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map