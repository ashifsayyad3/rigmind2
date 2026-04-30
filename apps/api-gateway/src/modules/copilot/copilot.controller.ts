import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { CopilotService } from './copilot.service';

class AskDto {
  @IsString() question: string;
  @IsArray() @IsOptional() conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

@ApiTags('AI Copilot')
@ApiBearerAuth('JWT')
@Controller({ path: 'copilot', version: '1' })
export class CopilotController {
  constructor(private readonly svc: CopilotService) {}

  @Post('ask')
  @ApiOperation({ summary: 'Ask a natural language question about rig data' })
  ask(@Body() dto: AskDto) {
    return this.svc.ask(dto.question, dto.conversationHistory ?? []);
  }

  @Get('report/:rigId')
  @ApiOperation({ summary: 'Generate AI executive health report for a rig' })
  generateReport(@Param('rigId', ParseIntPipe) rigId: number) {
    return this.svc.generateRigReport(rigId);
  }
}
