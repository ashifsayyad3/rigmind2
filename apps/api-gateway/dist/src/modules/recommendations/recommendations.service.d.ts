import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class RecommendationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findReports(filters: {
        rigId?: number;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            rig: {
                id: number;
                name: string;
            } | null;
            recommendations: ({
                rcmRecommendationFailureLink: ({
                    failures: {
                        description: string | null;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        rigId: number | null;
                        status: string | null;
                        updatedById: number | null;
                        isRemoved: boolean;
                        bopId: number | null;
                        createdById: number | null;
                        severity: string | null;
                        failureType: string | null;
                        equipmentType: string | null;
                        dateOfFailure: Date | null;
                        cause: string | null;
                        cycleCounts: number | null;
                        impactedFunctions: string | null;
                        indicationsSymptoms: string | null;
                        mechanism: string | null;
                        moc: boolean | null;
                        failureModeId: number | null;
                        nptHours: number | null;
                        componentId: number | null;
                    } | null;
                } & {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    failureId: number | null;
                    rcmRecommendationsId: number | null;
                })[];
                rcmRecommendationObservationLink: ({
                    observations: {
                        description: string | null;
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        title: string | null;
                        rigId: number | null;
                        status: string | null;
                        updatedById: number | null;
                        type: string | null;
                        isRemoved: boolean;
                        bopId: number | null;
                        createdById: number | null;
                        wellId: number | null;
                        severity: string | null;
                        componentId: number | null;
                        dateOfObservation: Date | null;
                        correctionDescription: string | null;
                        interventionStackId: number | null;
                        surfaceEquipmentId: number | null;
                    } | null;
                } & {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    observationId: number | null;
                    rcmRecommendationsId: number | null;
                })[];
            } & {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                status: string | null;
                availability: string | null;
                priority: string | null;
                rcmReportId: number | null;
                eventName: string | null;
                issueType: string | null;
                recommendation: string | null;
                dueDate: Date | null;
                isCommunicated: boolean;
                reasonOfNoCommunication: string | null;
                closeReason: string | null;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            rigId: number | null;
            isDeleted: boolean;
            availability: string | null;
            equipmentType: string | null;
            equipmentId: number | null;
            operationalStartDate: Date | null;
            operationalEndDate: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOneReport(id: number): Promise<{
        rig: {
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
        } | null;
        recommendations: ({
            rcmRecommendationFailureLink: ({
                failures: {
                    description: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    rigId: number | null;
                    status: string | null;
                    updatedById: number | null;
                    isRemoved: boolean;
                    bopId: number | null;
                    createdById: number | null;
                    severity: string | null;
                    failureType: string | null;
                    equipmentType: string | null;
                    dateOfFailure: Date | null;
                    cause: string | null;
                    cycleCounts: number | null;
                    impactedFunctions: string | null;
                    indicationsSymptoms: string | null;
                    mechanism: string | null;
                    moc: boolean | null;
                    failureModeId: number | null;
                    nptHours: number | null;
                    componentId: number | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureId: number | null;
                rcmRecommendationsId: number | null;
            })[];
            rcmRecommendationObservationLink: ({
                observations: {
                    description: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    title: string | null;
                    rigId: number | null;
                    status: string | null;
                    updatedById: number | null;
                    type: string | null;
                    isRemoved: boolean;
                    bopId: number | null;
                    createdById: number | null;
                    wellId: number | null;
                    severity: string | null;
                    componentId: number | null;
                    dateOfObservation: Date | null;
                    correctionDescription: string | null;
                    interventionStackId: number | null;
                    surfaceEquipmentId: number | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                observationId: number | null;
                rcmRecommendationsId: number | null;
            })[];
        } & {
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: string | null;
            availability: string | null;
            priority: string | null;
            rcmReportId: number | null;
            eventName: string | null;
            issueType: string | null;
            recommendation: string | null;
            dueDate: Date | null;
            isCommunicated: boolean;
            reasonOfNoCommunication: string | null;
            closeReason: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        rigId: number | null;
        isDeleted: boolean;
        availability: string | null;
        equipmentType: string | null;
        equipmentId: number | null;
        operationalStartDate: Date | null;
        operationalEndDate: Date | null;
    }>;
    findRecommendations(filters: {
        rigId?: number;
        priority?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            rcmReport: ({
                rig: {
                    id: number;
                    name: string;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                title: string | null;
                rigId: number | null;
                isDeleted: boolean;
                availability: string | null;
                equipmentType: string | null;
                equipmentId: number | null;
                operationalStartDate: Date | null;
                operationalEndDate: Date | null;
            }) | null;
            rcmRecommendationFailureLink: ({
                failures: {
                    description: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    rigId: number | null;
                    status: string | null;
                    updatedById: number | null;
                    isRemoved: boolean;
                    bopId: number | null;
                    createdById: number | null;
                    severity: string | null;
                    failureType: string | null;
                    equipmentType: string | null;
                    dateOfFailure: Date | null;
                    cause: string | null;
                    cycleCounts: number | null;
                    impactedFunctions: string | null;
                    indicationsSymptoms: string | null;
                    mechanism: string | null;
                    moc: boolean | null;
                    failureModeId: number | null;
                    nptHours: number | null;
                    componentId: number | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureId: number | null;
                rcmRecommendationsId: number | null;
            })[];
            rcmRecommendationObservationLink: ({
                observations: {
                    description: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    title: string | null;
                    rigId: number | null;
                    status: string | null;
                    updatedById: number | null;
                    type: string | null;
                    isRemoved: boolean;
                    bopId: number | null;
                    createdById: number | null;
                    wellId: number | null;
                    severity: string | null;
                    componentId: number | null;
                    dateOfObservation: Date | null;
                    correctionDescription: string | null;
                    interventionStackId: number | null;
                    surfaceEquipmentId: number | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                observationId: number | null;
                rcmRecommendationsId: number | null;
            })[];
        } & {
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: string | null;
            availability: string | null;
            priority: string | null;
            rcmReportId: number | null;
            eventName: string | null;
            issueType: string | null;
            recommendation: string | null;
            dueDate: Date | null;
            isCommunicated: boolean;
            reasonOfNoCommunication: string | null;
            closeReason: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    updateRecommendationStatus(id: number, status: string, userId: number): Promise<{
        description: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: string | null;
        availability: string | null;
        priority: string | null;
        rcmReportId: number | null;
        eventName: string | null;
        issueType: string | null;
        recommendation: string | null;
        dueDate: Date | null;
        isCommunicated: boolean;
        reasonOfNoCommunication: string | null;
        closeReason: string | null;
    }>;
    getStats(rigId?: number): Promise<{
        total: number;
        byPriority: (Prisma.PickEnumerable<Prisma.RcmRecommendationGroupByOutputType, "priority"[]> & {
            _count: {
                id: number;
            };
        })[];
        byStatus: (Prisma.PickEnumerable<Prisma.RcmRecommendationGroupByOutputType, "status"[]> & {
            _count: {
                id: number;
            };
        })[];
        overdue: number;
    }>;
}
