import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ObservationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: {
        rigId?: number;
        status?: string;
        type?: string;
        dateFrom?: Date;
        dateTo?: Date;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            rcmRecommendationObservationLink: ({
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
                observationId: number | null;
                rcmRecommendationsId: number | null;
            })[];
            wells: {
                id: number;
                name: string;
            } | null;
            observationCommunications: ({
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
                observationId: number | null;
                communicationId: number | null;
            })[];
            bops: {
                id: number;
                name: string | null;
            } | null;
            components: {
                uniqueComponentName: string | null;
                id: number;
            } | null;
            observationAttachments: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                startDate: Date | null;
                endDate: Date | null;
                observationId: number | null;
                attachmentId: number | null;
                sensorType: string | null;
                attachmentType: string | null;
            }[];
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: number): Promise<{
        rcmRecommendationObservationLink: ({
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
            observationId: number | null;
            rcmRecommendationsId: number | null;
        })[];
        wells: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            rigId: number | null;
            isRemoved: boolean;
            createdById: number | null;
            availability: string | null;
            depth: number | null;
            region: string | null;
            field: string | null;
        } | null;
        observationCommunications: ({
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
            observationId: number | null;
            communicationId: number | null;
        })[];
        bops: {
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
        components: {
            component: string | null;
            uniqueComponentName: string | null;
            subUnit: string | null;
            item: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            componentTag: string | null;
        } | null;
        observationAttachments: ({
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
            startDate: Date | null;
            endDate: Date | null;
            observationId: number | null;
            attachmentId: number | null;
            sensorType: string | null;
            attachmentType: string | null;
        })[];
    } & {
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
    }>;
    create(data: Prisma.ObservationCreateInput, userId: number): Promise<{
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
    }>;
    update(id: number, data: Prisma.ObservationUpdateInput, userId: number): Promise<{
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
    }>;
    remove(id: number, userId: number): Promise<{
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
    }>;
    getStats(): Promise<{
        total: number;
        byStatus: (Prisma.PickEnumerable<Prisma.ObservationGroupByOutputType, "status"[]> & {
            _count: {
                id: number;
            };
        })[];
        byType: (Prisma.PickEnumerable<Prisma.ObservationGroupByOutputType, "type"[]> & {
            _count: {
                id: number;
            };
        })[];
        withLinkedRecommendations: number;
    }>;
}
