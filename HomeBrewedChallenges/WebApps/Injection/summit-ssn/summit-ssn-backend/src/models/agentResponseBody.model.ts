import { Agent } from "./agent.model";

export class AgentResponseBody {
  agents: Agent[];
  sqlThatRan: string;
  errorMessage: string;

  constructor({ 
    agents = [], 
    sqlThatRan = '', 
    errorMessage = '' 
  }: Partial<AgentResponseBody> = {}) {
    this.agents = agents;
    this.sqlThatRan = sqlThatRan;
    this.errorMessage = errorMessage;
  }
}