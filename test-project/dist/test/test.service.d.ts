import { Test } from './interfaces/test.interface';
export declare class TestService {
    private readonly tests;
    create(test: Test): void;
    findAll(): Test[];
}
