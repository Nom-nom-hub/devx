import { z } from 'zod';

// Zod schema for .devx file validation
export const DevxConfigSchema = z.object({
  project: z.object({
    name: z.string(),
    type: z.string().optional(),
    language: z.string().optional(),
    version: z.string().optional(),
  }),
  scripts: z.record(z.string(), z.string()).optional(),
  tasks: z.array(
    z.object({
      name: z.string(),
      run: z.string(),
      description: z.string().optional(),
    })
  ).optional(),
  env: z.record(z.string(), z.string()).optional(),
  plugins: z.array(
    z.object({
      name: z.string(),
      path: z.string(),
      config: z.record(z.any()).optional(),
    })
  ).optional(),
});

// TypeScript type derived from the Zod schema
export type DevxConfig = z.infer<typeof DevxConfigSchema>;

// Plugin interface
export interface DevxPlugin {
  name: string;
  onInit?: (config: DevxConfig) => Promise<void> | void;
  onRun?: (scriptName: string, command: string) => Promise<void> | void;
  onValidate?: (config: DevxConfig) => Promise<string[]> | string[];
  onInfo?: (config: DevxConfig) => Promise<void> | void;
  [key: string]: any;
}

// Plugin constructor type
export type PluginConstructor = (config: any) => DevxPlugin;
