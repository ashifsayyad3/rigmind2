import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export interface FailureFilterDto {
    rigId?: number;
    severity?: string;
    status?: string;
    failureType?: string;
    equipmentType?: string;
    isNPT?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export declare class FailuresService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(filters: FailureFilterDto, userId: number, accessibleRigIds: number[] | null): Promise<{
        items: ({
            rig: {
                id: number;
                name: string;
            } | null;
            failureMode: {
                failureMode: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureModeTag: string | null;
            } | null;
            correctiveActions: {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                vendorOEM: string | null;
                serialNumber: string | null;
                partNumber: string | null;
                failureId: number;
                dateOfRepair: Date | null;
                actionTaken: string | null;
            }[];
            failureObservations: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureId: number;
                observationId: number;
            }[];
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: number): Promise<{
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
        failureMode: {
            failureMode: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureModeTag: string | null;
        } | null;
        lessonsLearned: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            updatedById: number | null;
            createdById: number | null;
            failureId: number;
            investigationResults: string | null;
            learningsImplemented: string | null;
        }[];
        rcmRecommendationFailureLink: ({
            rcmRecommendations: {
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
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureId: number | null;
            rcmRecommendationsId: number | null;
        })[];
        correctiveActions: {
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            vendorOEM: string | null;
            serialNumber: string | null;
            partNumber: string | null;
            failureId: number;
            dateOfRepair: Date | null;
            actionTaken: string | null;
        }[];
        failureObservations: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureId: number;
            observationId: number;
        }[];
        failureCommunications: ({
            communication: {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                rigId: number | null;
                status: string | null;
                type: string | null;
                communicationTime: Date | null;
                priority: string | null;
                mode: string | null;
                outageLevel: string | null;
                recipients: string | null;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureId: number | null;
            communicationId: number | null;
        })[];
        linkedFailures1: {
            id: number;
            failure1Id: number;
            failure2Id: number;
        }[];
        linkedFailures2: {
            id: number;
            failure1Id: number;
            failure2Id: number;
        }[];
        failureAttachments: ({
            attachment: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                blobName: string | null;
            } | null;
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureId: number | null;
            attachmentId: number | null;
        })[];
    } & {
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
    }>;
    create(data: Prisma.FailureCreateInput, userId: number): Promise<{
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
        failureMode: {
            failureMode: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureModeTag: string | null;
        } | null;
    } & {
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
    }>;
    update(id: number, data: Prisma.FailureUpdateInput, userId: number): Promise<{
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
        failureMode: {
            failureMode: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureModeTag: string | null;
        } | null;
    } & {
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
    }>;
    remove(id: number, userId: number): Promise<{
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
    }>;
    getStats(rigId?: number): Promise<{
        total: number;
        bySeverity: (Prisma.PickEnumerable<Prisma.FailureGroupByOutputType, "severity"[]> & {
            _count: {
                id: number;
            };
        })[];
        byStatus: (Prisma.PickEnumerable<Prisma.FailureGroupByOutputType, "status"[]> & {
            _count: {
                id: number;
            };
        })[];
        byEquipment: (Prisma.PickEnumerable<Prisma.FailureGroupByOutputType, "equipmentType"[]> & {
            _count: {
                id: number;
            };
        })[];
        recentTrend: {
            month: string;
            count: number;
        }[];
    }>;
    getSimilarFailures(id: number): Promise<({
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
        failureMode: {
            failureMode: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            failureModeTag: string | null;
        } | null;
    } & {
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
    })[]>;
    getTimeline(id: number): Promise<{
        failure: {
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
            failureMode: {
                failureMode: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureModeTag: string | null;
            } | null;
            lessonsLearned: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                updatedById: number | null;
                createdById: number | null;
                failureId: number;
                investigationResults: string | null;
                learningsImplemented: string | null;
            }[];
            rcmRecommendationFailureLink: ({
                rcmRecommendations: {
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
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureId: number | null;
                rcmRecommendationsId: number | null;
            })[];
            correctiveActions: {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                vendorOEM: string | null;
                serialNumber: string | null;
                partNumber: string | null;
                failureId: number;
                dateOfRepair: Date | null;
                actionTaken: string | null;
            }[];
            failureObservations: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureId: number;
                observationId: number;
            }[];
            failureCommunications: ({
                communication: {
                    description: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    rigId: number | null;
                    status: string | null;
                    type: string | null;
                    communicationTime: Date | null;
                    priority: string | null;
                    mode: string | null;
                    outageLevel: string | null;
                    recipients: string | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureId: number | null;
                communicationId: number | null;
            })[];
            linkedFailures1: {
                id: number;
                failure1Id: number;
                failure2Id: number;
            }[];
            linkedFailures2: {
                id: number;
                failure1Id: number;
                failure2Id: number;
            }[];
            failureAttachments: ({
                attachment: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string | null;
                    blobName: string | null;
                } | null;
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                failureId: number | null;
                attachmentId: number | null;
            })[];
        } & {
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
        };
        timeline: {
            type: string;
            date: any;
            data: any;
        }[];
        nptHours: number;
    }>;
}
