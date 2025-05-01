import zod from 'zod';

// Zod schema for .devx file validation
export const DevxConfigSchema = zod.object({
  project: zod.object({
    name: zod.string(),
    type: zod.string().optional(),
    language: zod.string().optional(),
    version: zod.string().optional(),
  }),
  scripts: zod.record(zod.string(), zod.string()).optional(),
  tasks: zod.array(
    zod.object({
      name: zod.string(),
      run: zod.string(),
      description: zod.string().optional(),
    })
  ).optional(),
  env: zod.record(zod.string(), zod.string()).optional(),
  plugins: zod.array(
    zod.object({
      name: zod.string(),
      path: zod.string(),
      config: zod.record(zod.any()).optional(),
    })
  ).optional(),
});

// TypeScript type derived from the Zod schema
export type DevxConfig = zod.infer<typeof DevxConfigSchema>;

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
