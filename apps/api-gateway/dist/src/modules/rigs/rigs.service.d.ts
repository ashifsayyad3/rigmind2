import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class RigsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: {
        status?: string;
        isRTM?: boolean;
        onContract?: boolean;
        category?: string;
        operatorId?: number;
        page?: number;
        limit?: number;
    }, accessibleRigIds: number[] | null): Promise<{
        items: ({
            _count: {
                failures: number;
                deferredMaintenanceTasks: number;
                certificates: number;
            };
            bops_rigs_bop1IdTobops: {
                id: number;
                name: string | null;
                type: string | null;
            } | null;
            bops_rigs_bop2IdTobops: {
                id: number;
                name: string | null;
                type: string | null;
            } | null;
            activeBOPAssignments: ({
                bop: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string | null;
                    type: string | null;
                    location: string | null;
                    onDeckDate: Date | null;
                    splashDate: Date | null;
                    latchTestStartDate: Date | null;
                    latchUpCompleteDate: Date | null;
                    installationDate: Date | null;
                    vendorOEM: string | null;
                    state: string | null;
                    serialNumber: string | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                rigId: number | null;
                rtmRigId: string | null;
                updatedById: number | null;
                isActive: boolean;
                bopId: number | null;
                startDate: Date | null;
                endDate: Date | null;
                createdById: number | null;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: string | null;
            isRTM: boolean;
            onContract: boolean;
            category: string | null;
            operatorId: number | null;
            offContractDate: Date | null;
            operationStart: Date | null;
            projectedUnLatchDate: Date | null;
            bop1Id: number | null;
            bop2Id: number | null;
            visible: boolean;
            rtmRigId: string | null;
            updatedById: number | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: number): Promise<{
        userRigs: ({
            user: {
                id: number;
                firstName: string;
                lastName: string;
                email: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            rigId: number;
        })[];
        bops_rigs_bop1IdTobops: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            type: string | null;
            location: string | null;
            onDeckDate: Date | null;
            splashDate: Date | null;
            latchTestStartDate: Date | null;
            latchUpCompleteDate: Date | null;
            installationDate: Date | null;
            vendorOEM: string | null;
            state: string | null;
            serialNumber: string | null;
        } | null;
        bops_rigs_bop2IdTobops: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            type: string | null;
            location: string | null;
            onDeckDate: Date | null;
            splashDate: Date | null;
            latchTestStartDate: Date | null;
            latchUpCompleteDate: Date | null;
            installationDate: Date | null;
            vendorOEM: string | null;
            state: string | null;
            serialNumber: string | null;
        } | null;
        activeBOPAssignments: ({
            bop: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                type: string | null;
                location: string | null;
                onDeckDate: Date | null;
                splashDate: Date | null;
                latchTestStartDate: Date | null;
                latchUpCompleteDate: Date | null;
                installationDate: Date | null;
                vendorOEM: string | null;
                state: string | null;
                serialNumber: string | null;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            rigId: number | null;
            rtmRigId: string | null;
            updatedById: number | null;
            isActive: boolean;
            bopId: number | null;
            startDate: Date | null;
            endDate: Date | null;
            createdById: number | null;
        })[];
        rigLandings: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            lattitude: number | null;
            longitude: number | null;
        }[];
        rigFeatures: ({
            feature: {
                description: string | null;
                id: number;
                enabled: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                position: number;
                url: string | null;
                icon: string | null;
                color: string | null;
                platformId: number | null;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            createdById: number | null;
            featureId: number | null;
        })[];
        rigCertificateComponents: {
            component: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            equipment: string | null;
            fleet: string | null;
            system: string | null;
            subSystem: string | null;
            included: boolean;
        }[];
        kpis: {
            id: number;
            createdAt: Date;
            rigId: number | null;
            testsequenceid: bigint | null;
            rigtypeid: number | null;
            number_tests_CP: number | null;
            availability: number | null;
            utilizationRate: number | null;
            starttime: Date | null;
            endtime: Date | null;
            total_time: string | null;
            time_between_tests: string | null;
            time_passed_tests: string | null;
            time_failed_tests: string | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: string | null;
        isRTM: boolean;
        onContract: boolean;
        category: string | null;
        operatorId: number | null;
        offContractDate: Date | null;
        operationStart: Date | null;
        projectedUnLatchDate: Date | null;
        bop1Id: number | null;
        bop2Id: number | null;
        visible: boolean;
        rtmRigId: string | null;
        updatedById: number | null;
    }>;
    update(id: number, data: Prisma.RigUpdateInput, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: string | null;
        isRTM: boolean;
        onContract: boolean;
        category: string | null;
        operatorId: number | null;
        offContractDate: Date | null;
        operationStart: Date | null;
        projectedUnLatchDate: Date | null;
        bop1Id: number | null;
        bop2Id: number | null;
        visible: boolean;
        rtmRigId: string | null;
        updatedById: number | null;
    }>;
    getHealthSnapshot(id: number): Promise<{
        rigId: number;
        openFailures: number;
        openMaintenanceTasks: number;
        expiringCertificates: number;
        nptHoursLast30d: number;
        availability: number | null;
        utilizationRate: number | null;
        updatedAt: Date;
    }>;
    getCurrentWell(rigId: number): Promise<unknown>;
    getStatusHistory(rigId: number, take?: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rigId: number | null;
        status: string | null;
        projectedUnLatchDate: Date | null;
        startDate: Date | null;
        wellId: number | null;
        depth: number | null;
        bop1ChangesId: number | null;
    }[]>;
}
