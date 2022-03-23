import { CreateTestDTO } from './dto/create-test.dto';
import { TestService } from './test.service';
import { Test } from './interfaces/test.interface';
export declare class TestController {
    private testService;
    constructor(testService: TestService);
    getTest(): string;
    getStatus(response: any): any;
    getPath(request: any): string;
    findAll(res: any): Promise<Test[]>;
    getId(id: string): string;
    create(createTestDTO: CreateTestDTO): any;
}
