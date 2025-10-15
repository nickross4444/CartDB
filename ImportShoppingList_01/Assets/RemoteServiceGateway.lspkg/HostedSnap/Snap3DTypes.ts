import Event from "../Utils/Event";

export namespace Snap3DTypes {
  export type FileFormat = "glb";
  export type SubmitRequestBody = {
    prompt: string;
    format: FileFormat;
    refine: boolean;
    use_vertex_color: boolean;
  };
  export type SubmitResponseBody = {
    success: boolean;
    task_id: string;
  };
  export type GetStatusRequestBody = {
    task_id: string;
  };
  export type GetStatusResponseBody = {
    status: Status;
    stage: Stage;
    error_msg: string;
    error_code: number;
    artifacts: Artifact[];
  };
  export type Artifact = {
    url: string;
    artifact_type: ArtifactType;
    format: FileFormat;
  };
  export type ArtifactType = "image" | "base_mesh" | "refined_mesh";
  export type Status = "initialized" | "running" | "completed" | "failed";
  export type Stage = "image_gen" | "base_mesh_gen" | "refined_mesh_gen";

  export type TextureAssetData = {
    url: string;
    texture: Texture;
  };
  export type GltfAssetData = {
    url: string;
    gltfAsset: GltfAsset;
  };
  export type ErrorData = {
    errorMsg: string;
    errorCode: number;
  };
  export type SubmitGetStatusResults = {
    task_id: string;
    status: Status;
    event: Event<
      [ArtifactType | "failed", TextureAssetData | GltfAssetData | ErrorData]
    >;
    texture?: Texture;
    textureUrl?: string;
    baseMeshGltf?: GltfAsset;
    baseMeshUrl?: string;
    refinedMeshGltf?: GltfAsset;
    refinedMeshUrl?: string;
  };
}
