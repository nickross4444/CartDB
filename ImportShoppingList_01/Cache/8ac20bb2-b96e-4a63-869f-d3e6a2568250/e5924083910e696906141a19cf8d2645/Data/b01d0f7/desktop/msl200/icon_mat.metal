#include <metal_stdlib>
#include <simd/simd.h>
using namespace metal;
#ifdef Active
#undef Active
#endif
#ifdef Hover
#undef Hover
#endif
#ifdef xRightPin
#undef xRightPin
#endif
#ifdef xLeftPin
#undef xLeftPin
#endif
#ifdef yUpPin
#undef yUpPin
#endif
#ifdef yDownPin
#undef yDownPin
#endif
namespace SNAP_VS {
int sc_GetStereoViewIndex()
{
return 0;
}
}
#ifndef sc_TextureRenderingLayout_Regular
#define sc_TextureRenderingLayout_Regular 0
#define sc_TextureRenderingLayout_StereoInstancedClipped 1
#define sc_TextureRenderingLayout_StereoMultiview 2
#endif
// SCC_BACKEND_SHADER_FLAGS_BEGIN__
// SCC_BACKEND_SHADER_FLAGS_END__
//SG_REFLECTION_BEGIN(200)
//attribute vec4 boneData 5
//attribute vec3 blendShape0Pos 6
//attribute vec3 blendShape0Normal 12
//attribute vec3 blendShape1Pos 7
//attribute vec3 blendShape1Normal 13
//attribute vec3 blendShape2Pos 8
//attribute vec3 blendShape2Normal 14
//attribute vec3 blendShape3Pos 9
//attribute vec3 blendShape4Pos 10
//attribute vec3 blendShape5Pos 11
//attribute vec4 position 0
//attribute vec3 normal 1
//attribute vec4 tangent 2
//attribute vec2 texture0 3
//attribute vec2 texture1 4
//attribute vec4 color 18
//attribute vec3 positionNext 15
//attribute vec3 positionPrevious 16
//attribute vec4 strandProperties 17
//output vec4 sc_FragData0 0
//sampler sampler baseTexSmpSC 0:24
//sampler sampler intensityTextureSmpSC 0:25
//sampler sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC 0:29
//sampler sampler sc_RayTracingRayDirectionSmpSC 0:30
//sampler sampler sc_ScreenTextureSmpSC 0:32
//sampler sampler shapeTextureSmpSC 0:35
//sampler sampler strokeTextureSmpSC 0:36
//texture texture2D baseTex 0:4:0:24
//texture texture2D intensityTexture 0:5:0:25
//texture utexture2D sc_RayTracingHitCasterIdAndBarycentric 0:16:0:29
//texture texture2D sc_RayTracingRayDirection 0:17:0:30
//texture texture2D sc_ScreenTexture 0:19:0:32
//texture texture2D shapeTexture 0:22:0:35
//texture texture2D strokeTexture 0:23:0:36
//ubo float sc_BonesUBO 0:3:96 {
//sc_Bone_t sc_Bones 0:[1]:96
//float4 sc_Bones.boneMatrix 0:[3]:16
//float4 sc_Bones.normalMatrix 48:[3]:16
//}
//ubo int UserUniforms 0:37:6496 {
//float4 sc_Time 1376
//float4 sc_UniformConstants 1392
//float4x4 sc_ViewProjectionMatrixArray 1680:[2]:64
//float4x4 sc_ModelViewMatrixArray 1936:[2]:64
//float4x4 sc_ProjectionMatrixArray 2384:[2]:64
//float4x4 sc_ProjectionMatrixInverseArray 2512:[2]:64
//float4x4 sc_ViewMatrixArray 2640:[2]:64
//float4x4 sc_PrevFrameViewProjectionMatrixArray 2896:[2]:64
//float4x4 sc_ModelMatrix 3024
//float4x4 sc_ModelMatrixInverse 3088
//float3x3 sc_NormalMatrix 3152
//float4x4 sc_PrevFrameModelMatrix 3248
//float4 sc_CurrentRenderTargetDims 3456
//sc_Camera_t sc_Camera 3472
//float3 sc_Camera.position 0
//float sc_Camera.aspect 16
//float2 sc_Camera.clipPlanes 24
//float sc_ShadowDensity 3504
//float4 sc_ShadowColor 3520
//float4x4 sc_ProjectorMatrix 3536
//float4 weights0 3616
//float4 weights1 3632
//float4 sc_StereoClipPlanes 3664:[2]:16
//float2 sc_TAAJitterOffset 3704
//uint4 sc_RayTracingCasterConfiguration 3824
//uint4 sc_RayTracingCasterOffsetPNTC 3840
//uint4 sc_RayTracingCasterOffsetTexture 3856
//uint4 sc_RayTracingCasterFormatPNTC 3872
//uint4 sc_RayTracingCasterFormatTexture 3888
//float4 voxelization_params_0 3952
//float4 voxelization_params_frustum_lrbt 3968
//float4 voxelization_params_frustum_nf 3984
//float3 voxelization_params_camera_pos 4000
//float4x4 sc_ModelMatrixVoxelization 4016
//float correctedIntensity 4080
//float3x3 intensityTextureTransform 4144
//float4 intensityTextureUvMinMax 4192
//float4 intensityTextureBorderColor 4208
//int PreviewEnabled 4372
//float alphaTestThreshold 4380
//bool Active 4384
//bool Hover 4388
//float4 shadowColor 4400
//float shapeAlpha 4416
//float shapeWidthX 4420
//bool xRightPin 4424
//float strokeThickness 4428
//bool xLeftPin 4432
//float xOffset 4436
//float shapeHeightY 4440
//bool yUpPin 4444
//bool yDownPin 4448
//float yOffset 4452
//float shadowRotation 4456
//float shadowDistance 4460
//float shapeRotation 4464
//float shadowBlur 4468
//float shapeRoundness 4472
//float strokeAlpha 4476
//float shadowAlpha 4480
//float4 shapeColor 4496
//float3x3 shapeTextureTransform 4560
//float4 shapeTextureUvMinMax 4608
//float4 shapeTextureBorderColor 4624
//float2 shapeScale 4640
//float2 shapeOffset 4648
//float4 shapeGradColorA 4656
//float4 shapeGradColorB 4672
//float2 shapeScaleGrad 4688
//float2 shapeGradPointA 4696
//float2 shapeGradPointB 4704
//float2 shapeQuadOffset 4712
//float4 shapeGradColorC 4720
//float4 shapeGradColorD 4736
//float4 strokeColor 4752
//float3x3 strokeTextureTransform 4816
//float4 strokeTextureUvMinMax 4864
//float4 strokeTextureBorderColor 4880
//float2 strokeScale 4896
//float2 strokeOffset 4904
//float4 shapeGradColorA2 4912
//float4 shapeGradColorB2 4928
//float2 shapeScaleGrad2 4944
//float2 shapeGradPointA2 4952
//float2 shapeGradPointB2 4960
//float2 shapeQuadOffset2 4968
//float4 shapeGradColorC2 4976
//float4 shapeGradColorD2 4992
//float3x3 baseTexTransform 5056
//float4 baseTexUvMinMax 5104
//float4 baseTexBorderColor 5120
//float Port_RangeMinA_N136 5136
//float Port_RangeMaxA_N136 5140
//float Port_RangeMinB_N136 5144
//float Port_RangeMaxB_N136 5148
//float4 Port_Default_N126 5152
//float4 Port_Value0_N154 5168
//float Port_Value1_N157 5184
//float4 Port_Default_N154 5200
//float2 Port_Input2_N148 5216
//float Port_RangeMinA_N268 5228
//float Port_RangeMaxA_N268 5232
//float Port_Value0_N287 5240
//float Port_Value_N288 5248
//float Port_RangeMinA_N276 5256
//float Port_RangeMaxA_N276 5260
//float Port_RangeMinB_N276 5264
//float Port_RangeMaxB_N276 5268
//float Port_Default_N294 5272
//float Port_Default_N287 5276
//float Port_Value0_N281 5284
//float Port_RangeMinA_N295 5288
//float Port_RangeMaxA_N295 5292
//float Port_RangeMinB_N295 5296
//float Port_RangeMaxB_N295 5300
//float Port_Default_N296 5304
//float Port_Default_N281 5308
//float Port_Value0_N282 5316
//float Port_Value1_N282 5320
//float Port_Default_N282 5324
//float Port_Value0_N308 5328
//float Port_Value0_N304 5332
//float Port_RangeMinA_N303 5336
//float Port_RangeMaxA_N303 5340
//float Port_RangeMinB_N303 5344
//float Port_RangeMaxB_N303 5348
//float Port_Default_N304 5352
//float Port_Default_N308 5356
//float Port_RangeMinA_N277 5364
//float Port_RangeMaxA_N277 5368
//float Port_Value0_N289 5376
//float Port_RangeMinA_N299 5380
//float Port_RangeMaxA_N299 5384
//float Port_RangeMinB_N299 5388
//float Port_RangeMaxB_N299 5392
//float Port_Default_N297 5396
//float Port_Default_N289 5400
//float Port_Value0_N286 5408
//float Port_RangeMinA_N300 5412
//float Port_RangeMaxA_N300 5416
//float Port_RangeMinB_N300 5420
//float Port_RangeMaxB_N300 5424
//float Port_Default_N298 5428
//float Port_Default_N286 5432
//float Port_Value0_N293 5440
//float Port_Value1_N293 5444
//float Port_Default_N293 5448
//float Port_Value0_N301 5452
//float Port_Value0_N306 5456
//float Port_RangeMinA_N305 5460
//float Port_RangeMaxA_N305 5464
//float Port_RangeMinB_N305 5468
//float Port_RangeMaxB_N305 5472
//float Port_Default_N306 5476
//float Port_Default_N301 5480
//float Port_Value0_N132 5484
//float Port_Input1_N141 5488
//float Port_Default_N132 5492
//float2 Port_Center_N092 5496
//float Port_Value1_N097 5504
//float Port_Value0_N131 5508
//float Port_Default_N131 5512
//float Port_Input1_N160 5516
//float Port_Input1_N263 5520
//float2 Port_Center_N094 5528
//float2 Port_Center_N100 5536
//float Port_Value0_N125 5544
//float Port_Default_N125 5548
//float Port_RangeMinA_N138 5552
//float Port_RangeMaxA_N138 5556
//float Port_RangeMinB_N138 5560
//float Port_RangeMaxB_N138 5564
//float2 Port_Center_N137 5568
//float Port_Input1_N019 5576
//float Port_Input1_N020 5580
//float Port_RangeMinA_N021 5584
//float Port_RangeMaxA_N021 5588
//float Port_RangeMinB_N021 5592
//float Port_Value0_N122 5596
//float Port_Default_N122 5600
//float Port_Input1_N056 5604
//float Port_RangeMinA_N022 5608
//float Port_RangeMaxA_N022 5612
//float Port_RangeMinB_N022 5616
//float Port_Input1_N030 5620
//float2 Port_Input1_N032 5624
//float Port_RangeMinA_N135 5632
//float Port_RangeMaxA_N135 5636
//float Port_Input1_N127 5640
//float Port_RangeMaxB_N135 5644
//float Port_Input1_N038 5648
//float Port_Input2_N038 5652
//float Port_Input1_N264 5656
//float Port_Input2_N264 5660
//float Port_RangeMinA_N039 5664
//float Port_RangeMaxA_N039 5668
//float Port_RangeMaxB_N039 5672
//float Port_RangeMinA_N042 5676
//float Port_RangeMaxA_N042 5680
//float Port_RangeMaxB_N042 5684
//float Port_RangeMinA_N047 5688
//float Port_RangeMaxA_N047 5692
//float Port_RangeMinA_N101 5696
//float Port_RangeMaxA_N101 5700
//float Port_RangeMinB_N101 5704
//float Port_RangeMinA_N057 5708
//float Port_RangeMaxA_N057 5712
//float Port_RangeMinB_N057 5716
//float Port_RangeMaxB_N057 5720
//float Port_RangeMaxB_N047 5724
//float Port_Input1_N051 5728
//float2 Port_Input1_N053 5736
//float Port_RangeMinA_N133 5744
//float Port_RangeMaxA_N133 5748
//float Port_RangeMaxB_N133 5752
//float Port_Input1_N064 5756
//float Port_Input2_N064 5760
//float Port_Input1_N066 5764
//float Port_Input2_N066 5768
//float Port_Value0_N068 5772
//float Port_Default_N068 5776
//float Port_Input1_N072 5780
//float Port_Input2_N072 5784
//float Port_Value0_N123 5788
//float Port_Default_N123 5792
//float Port_Input1_N259 5796
//float2 Port_Center_N113 5800
//float Port_Input1_N089 5808
//float Port_Input1_N090 5812
//float Port_Input1_N103 5816
//float2 Port_Input1_N105 5824
//float Port_Input1_N112 5832
//float Port_Input2_N112 5836
//float Port_Input0_N186 5872
//float Port_Input1_N186 5876
//float Port_RangeMinA_N175 5880
//float Port_RangeMaxA_N175 5884
//float Port_RangeMinB_N175 5888
//float Port_RangeMaxB_N175 5892
//float2 Port_Center_N177 5904
//float Port_Input1_N185 5928
//float Port_Input2_N185 5932
//float Port_RangeMinA_N198 5968
//float Port_RangeMaxA_N198 5972
//float Port_RangeMinB_N198 5976
//float Port_RangeMaxB_N198 5980
//float4 Port_Default_N209 6032
//float4 Port_Default_N149 6048
//float Port_Input1_N265 6064
//float Port_Input2_N265 6068
//float Port_Input1_N098 6072
//float2 Port_Input1_N115 6080
//float Port_Input1_N142 6088
//float Port_Input2_N142 6092
//float Port_Input1_N144 6096
//float Port_Input2_N144 6100
//float Port_RangeMinA_N171 6104
//float Port_RangeMaxA_N171 6108
//float4 Port_Value0_N325 6112
//float Port_Input0_N242 6160
//float Port_Input1_N242 6164
//float Port_RangeMinA_N231 6168
//float Port_RangeMaxA_N231 6172
//float Port_RangeMinB_N231 6176
//float Port_RangeMaxB_N231 6180
//float2 Port_Center_N233 6192
//float Port_Input1_N241 6216
//float Port_Input2_N241 6220
//float Port_RangeMinA_N252 6256
//float Port_RangeMaxA_N252 6260
//float Port_RangeMinB_N252 6264
//float Port_RangeMaxB_N252 6268
//float4 Port_Default_N323 6320
//float4 Port_Default_N324 6336
//float4 Port_Default_N325 6352
//float Port_Input1_N335 6368
//float4 Port_Input1_N345 6384
//float4 Port_Input_N339 6416
//float2 Port_Scale_N340 6432
//float2 Port_Center_N340 6440
//float4 Port_Input_N006 6448
//float Port_Input1_N361 6480
//float Port_Input2_N361 6484
//float depthRef 6488
//}
//ssbo int sc_RayTracingCasterIndexBuffer 0:0:4 {
//uint sc_RayTracingCasterTriangles 0:[1]:4
//}
//ssbo float sc_RayTracingCasterNonAnimatedVertexBuffer 0:2:4 {
//float sc_RayTracingCasterNonAnimatedVertices 0:[1]:4
//}
//ssbo float sc_RayTracingCasterVertexBuffer 0:1:4 {
//float sc_RayTracingCasterVertices 0:[1]:4
//}
//spec_const bool BLEND_MODE_AVERAGE 0 0
//spec_const bool BLEND_MODE_BRIGHT 1 0
//spec_const bool BLEND_MODE_COLOR_BURN 2 0
//spec_const bool BLEND_MODE_COLOR_DODGE 3 0
//spec_const bool BLEND_MODE_COLOR 4 0
//spec_const bool BLEND_MODE_DARKEN 5 0
//spec_const bool BLEND_MODE_DIFFERENCE 6 0
//spec_const bool BLEND_MODE_DIVIDE 7 0
//spec_const bool BLEND_MODE_DIVISION 8 0
//spec_const bool BLEND_MODE_EXCLUSION 9 0
//spec_const bool BLEND_MODE_FORGRAY 10 0
//spec_const bool BLEND_MODE_HARD_GLOW 11 0
//spec_const bool BLEND_MODE_HARD_LIGHT 12 0
//spec_const bool BLEND_MODE_HARD_MIX 13 0
//spec_const bool BLEND_MODE_HARD_PHOENIX 14 0
//spec_const bool BLEND_MODE_HARD_REFLECT 15 0
//spec_const bool BLEND_MODE_HUE 16 0
//spec_const bool BLEND_MODE_INTENSE 17 0
//spec_const bool BLEND_MODE_LIGHTEN 18 0
//spec_const bool BLEND_MODE_LINEAR_LIGHT 19 0
//spec_const bool BLEND_MODE_LUMINOSITY 20 0
//spec_const bool BLEND_MODE_NEGATION 21 0
//spec_const bool BLEND_MODE_NOTBRIGHT 22 0
//spec_const bool BLEND_MODE_OVERLAY 23 0
//spec_const bool BLEND_MODE_PIN_LIGHT 24 0
//spec_const bool BLEND_MODE_REALISTIC 25 0
//spec_const bool BLEND_MODE_SATURATION 26 0
//spec_const bool BLEND_MODE_SOFT_LIGHT 27 0
//spec_const bool BLEND_MODE_SUBTRACT 28 0
//spec_const bool BLEND_MODE_VIVID_LIGHT 29 0
//spec_const bool ENABLE_STIPPLE_PATTERN_TEST 30 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_baseTex 31 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_intensityTexture 32 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_shapeTexture 33 0
//spec_const bool SC_USE_CLAMP_TO_BORDER_strokeTexture 34 0
//spec_const bool SC_USE_UV_MIN_MAX_baseTex 35 0
//spec_const bool SC_USE_UV_MIN_MAX_intensityTexture 36 0
//spec_const bool SC_USE_UV_MIN_MAX_shapeTexture 37 0
//spec_const bool SC_USE_UV_MIN_MAX_strokeTexture 38 0
//spec_const bool SC_USE_UV_TRANSFORM_baseTex 39 0
//spec_const bool SC_USE_UV_TRANSFORM_intensityTexture 40 0
//spec_const bool SC_USE_UV_TRANSFORM_shapeTexture 41 0
//spec_const bool SC_USE_UV_TRANSFORM_strokeTexture 42 0
//spec_const bool Tweak_N124 43 0
//spec_const bool Tweak_N139 44 0
//spec_const bool UseViewSpaceDepthVariant 45 1
//spec_const bool baseTexHasSwappedViews 46 0
//spec_const bool innerCutout 47 0
//spec_const bool intensityTextureHasSwappedViews 48 0
//spec_const bool sc_BlendMode_AddWithAlphaFactor 49 0
//spec_const bool sc_BlendMode_Add 50 0
//spec_const bool sc_BlendMode_AlphaTest 51 0
//spec_const bool sc_BlendMode_AlphaToCoverage 52 0
//spec_const bool sc_BlendMode_ColoredGlass 53 0
//spec_const bool sc_BlendMode_Custom 54 0
//spec_const bool sc_BlendMode_Max 55 0
//spec_const bool sc_BlendMode_Min 56 0
//spec_const bool sc_BlendMode_MultiplyOriginal 57 0
//spec_const bool sc_BlendMode_Multiply 58 0
//spec_const bool sc_BlendMode_Normal 59 0
//spec_const bool sc_BlendMode_PremultipliedAlphaAuto 60 0
//spec_const bool sc_BlendMode_PremultipliedAlphaHardware 61 0
//spec_const bool sc_BlendMode_PremultipliedAlpha 62 0
//spec_const bool sc_BlendMode_Screen 63 0
//spec_const bool sc_DepthOnly 64 0
//spec_const bool sc_FramebufferFetch 65 0
//spec_const bool sc_MotionVectorsPass 66 0
//spec_const bool sc_OITCompositingPass 67 0
//spec_const bool sc_OITDepthBoundsPass 68 0
//spec_const bool sc_OITDepthGatherPass 69 0
//spec_const bool sc_OutputBounds 70 0
//spec_const bool sc_ProjectiveShadowsCaster 71 0
//spec_const bool sc_ProjectiveShadowsReceiver 72 0
//spec_const bool sc_RayTracingCasterForceOpaque 73 0
//spec_const bool sc_RenderAlphaToColor 74 0
//spec_const bool sc_ScreenTextureHasSwappedViews 75 0
//spec_const bool sc_TAAEnabled 76 0
//spec_const bool sc_VertexBlendingUseNormals 77 0
//spec_const bool sc_VertexBlending 78 0
//spec_const bool sc_Voxelization 79 0
//spec_const bool shapeAspectFix 80 0
//spec_const bool shapeColorInvert 81 0
//spec_const bool shapeTextureHasSwappedViews 82 0
//spec_const bool strokeTextureHasSwappedViews 83 0
//spec_const bool toQuadShapeGrad 84 0
//spec_const bool toQuadStrokeGrad 85 0
//spec_const int NODE_161_DROPLIST_ITEM 86 0
//spec_const int NODE_164_DROPLIST_ITEM 87 0
//spec_const int SC_SOFTWARE_WRAP_MODE_U_baseTex 88 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_intensityTexture 89 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_shapeTexture 90 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_U_strokeTexture 91 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_baseTex 92 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_intensityTexture 93 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_shapeTexture 94 -1
//spec_const int SC_SOFTWARE_WRAP_MODE_V_strokeTexture 95 -1
//spec_const int baseTexLayout 96 0
//spec_const int intensityTextureLayout 97 0
//spec_const int sc_DepthBufferMode 98 0
//spec_const int sc_RenderingSpace 99 -1
//spec_const int sc_ScreenTextureLayout 100 0
//spec_const int sc_ShaderCacheConstant 101 0
//spec_const int sc_SkinBonesCount 102 0
//spec_const int sc_StereoRenderingMode 103 0
//spec_const int sc_StereoRendering_IsClipDistanceEnabled 104 0
//spec_const int shapeTextureLayout 105 0
//spec_const int strokeTextureLayout 106 0
//SG_REFLECTION_END
constant bool BLEND_MODE_AVERAGE [[function_constant(0)]];
constant bool BLEND_MODE_AVERAGE_tmp = is_function_constant_defined(BLEND_MODE_AVERAGE) ? BLEND_MODE_AVERAGE : false;
constant bool BLEND_MODE_BRIGHT [[function_constant(1)]];
constant bool BLEND_MODE_BRIGHT_tmp = is_function_constant_defined(BLEND_MODE_BRIGHT) ? BLEND_MODE_BRIGHT : false;
constant bool BLEND_MODE_COLOR_BURN [[function_constant(2)]];
constant bool BLEND_MODE_COLOR_BURN_tmp = is_function_constant_defined(BLEND_MODE_COLOR_BURN) ? BLEND_MODE_COLOR_BURN : false;
constant bool BLEND_MODE_COLOR_DODGE [[function_constant(3)]];
constant bool BLEND_MODE_COLOR_DODGE_tmp = is_function_constant_defined(BLEND_MODE_COLOR_DODGE) ? BLEND_MODE_COLOR_DODGE : false;
constant bool BLEND_MODE_COLOR [[function_constant(4)]];
constant bool BLEND_MODE_COLOR_tmp = is_function_constant_defined(BLEND_MODE_COLOR) ? BLEND_MODE_COLOR : false;
constant bool BLEND_MODE_DARKEN [[function_constant(5)]];
constant bool BLEND_MODE_DARKEN_tmp = is_function_constant_defined(BLEND_MODE_DARKEN) ? BLEND_MODE_DARKEN : false;
constant bool BLEND_MODE_DIFFERENCE [[function_constant(6)]];
constant bool BLEND_MODE_DIFFERENCE_tmp = is_function_constant_defined(BLEND_MODE_DIFFERENCE) ? BLEND_MODE_DIFFERENCE : false;
constant bool BLEND_MODE_DIVIDE [[function_constant(7)]];
constant bool BLEND_MODE_DIVIDE_tmp = is_function_constant_defined(BLEND_MODE_DIVIDE) ? BLEND_MODE_DIVIDE : false;
constant bool BLEND_MODE_DIVISION [[function_constant(8)]];
constant bool BLEND_MODE_DIVISION_tmp = is_function_constant_defined(BLEND_MODE_DIVISION) ? BLEND_MODE_DIVISION : false;
constant bool BLEND_MODE_EXCLUSION [[function_constant(9)]];
constant bool BLEND_MODE_EXCLUSION_tmp = is_function_constant_defined(BLEND_MODE_EXCLUSION) ? BLEND_MODE_EXCLUSION : false;
constant bool BLEND_MODE_FORGRAY [[function_constant(10)]];
constant bool BLEND_MODE_FORGRAY_tmp = is_function_constant_defined(BLEND_MODE_FORGRAY) ? BLEND_MODE_FORGRAY : false;
constant bool BLEND_MODE_HARD_GLOW [[function_constant(11)]];
constant bool BLEND_MODE_HARD_GLOW_tmp = is_function_constant_defined(BLEND_MODE_HARD_GLOW) ? BLEND_MODE_HARD_GLOW : false;
constant bool BLEND_MODE_HARD_LIGHT [[function_constant(12)]];
constant bool BLEND_MODE_HARD_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_HARD_LIGHT) ? BLEND_MODE_HARD_LIGHT : false;
constant bool BLEND_MODE_HARD_MIX [[function_constant(13)]];
constant bool BLEND_MODE_HARD_MIX_tmp = is_function_constant_defined(BLEND_MODE_HARD_MIX) ? BLEND_MODE_HARD_MIX : false;
constant bool BLEND_MODE_HARD_PHOENIX [[function_constant(14)]];
constant bool BLEND_MODE_HARD_PHOENIX_tmp = is_function_constant_defined(BLEND_MODE_HARD_PHOENIX) ? BLEND_MODE_HARD_PHOENIX : false;
constant bool BLEND_MODE_HARD_REFLECT [[function_constant(15)]];
constant bool BLEND_MODE_HARD_REFLECT_tmp = is_function_constant_defined(BLEND_MODE_HARD_REFLECT) ? BLEND_MODE_HARD_REFLECT : false;
constant bool BLEND_MODE_HUE [[function_constant(16)]];
constant bool BLEND_MODE_HUE_tmp = is_function_constant_defined(BLEND_MODE_HUE) ? BLEND_MODE_HUE : false;
constant bool BLEND_MODE_INTENSE [[function_constant(17)]];
constant bool BLEND_MODE_INTENSE_tmp = is_function_constant_defined(BLEND_MODE_INTENSE) ? BLEND_MODE_INTENSE : false;
constant bool BLEND_MODE_LIGHTEN [[function_constant(18)]];
constant bool BLEND_MODE_LIGHTEN_tmp = is_function_constant_defined(BLEND_MODE_LIGHTEN) ? BLEND_MODE_LIGHTEN : false;
constant bool BLEND_MODE_LINEAR_LIGHT [[function_constant(19)]];
constant bool BLEND_MODE_LINEAR_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_LINEAR_LIGHT) ? BLEND_MODE_LINEAR_LIGHT : false;
constant bool BLEND_MODE_LUMINOSITY [[function_constant(20)]];
constant bool BLEND_MODE_LUMINOSITY_tmp = is_function_constant_defined(BLEND_MODE_LUMINOSITY) ? BLEND_MODE_LUMINOSITY : false;
constant bool BLEND_MODE_NEGATION [[function_constant(21)]];
constant bool BLEND_MODE_NEGATION_tmp = is_function_constant_defined(BLEND_MODE_NEGATION) ? BLEND_MODE_NEGATION : false;
constant bool BLEND_MODE_NOTBRIGHT [[function_constant(22)]];
constant bool BLEND_MODE_NOTBRIGHT_tmp = is_function_constant_defined(BLEND_MODE_NOTBRIGHT) ? BLEND_MODE_NOTBRIGHT : false;
constant bool BLEND_MODE_OVERLAY [[function_constant(23)]];
constant bool BLEND_MODE_OVERLAY_tmp = is_function_constant_defined(BLEND_MODE_OVERLAY) ? BLEND_MODE_OVERLAY : false;
constant bool BLEND_MODE_PIN_LIGHT [[function_constant(24)]];
constant bool BLEND_MODE_PIN_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_PIN_LIGHT) ? BLEND_MODE_PIN_LIGHT : false;
constant bool BLEND_MODE_REALISTIC [[function_constant(25)]];
constant bool BLEND_MODE_REALISTIC_tmp = is_function_constant_defined(BLEND_MODE_REALISTIC) ? BLEND_MODE_REALISTIC : false;
constant bool BLEND_MODE_SATURATION [[function_constant(26)]];
constant bool BLEND_MODE_SATURATION_tmp = is_function_constant_defined(BLEND_MODE_SATURATION) ? BLEND_MODE_SATURATION : false;
constant bool BLEND_MODE_SOFT_LIGHT [[function_constant(27)]];
constant bool BLEND_MODE_SOFT_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_SOFT_LIGHT) ? BLEND_MODE_SOFT_LIGHT : false;
constant bool BLEND_MODE_SUBTRACT [[function_constant(28)]];
constant bool BLEND_MODE_SUBTRACT_tmp = is_function_constant_defined(BLEND_MODE_SUBTRACT) ? BLEND_MODE_SUBTRACT : false;
constant bool BLEND_MODE_VIVID_LIGHT [[function_constant(29)]];
constant bool BLEND_MODE_VIVID_LIGHT_tmp = is_function_constant_defined(BLEND_MODE_VIVID_LIGHT) ? BLEND_MODE_VIVID_LIGHT : false;
constant bool ENABLE_STIPPLE_PATTERN_TEST [[function_constant(30)]];
constant bool ENABLE_STIPPLE_PATTERN_TEST_tmp = is_function_constant_defined(ENABLE_STIPPLE_PATTERN_TEST) ? ENABLE_STIPPLE_PATTERN_TEST : false;
constant bool SC_USE_CLAMP_TO_BORDER_baseTex [[function_constant(31)]];
constant bool SC_USE_CLAMP_TO_BORDER_baseTex_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_baseTex) ? SC_USE_CLAMP_TO_BORDER_baseTex : false;
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture [[function_constant(32)]];
constant bool SC_USE_CLAMP_TO_BORDER_intensityTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_intensityTexture) ? SC_USE_CLAMP_TO_BORDER_intensityTexture : false;
constant bool SC_USE_CLAMP_TO_BORDER_shapeTexture [[function_constant(33)]];
constant bool SC_USE_CLAMP_TO_BORDER_shapeTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_shapeTexture) ? SC_USE_CLAMP_TO_BORDER_shapeTexture : false;
constant bool SC_USE_CLAMP_TO_BORDER_strokeTexture [[function_constant(34)]];
constant bool SC_USE_CLAMP_TO_BORDER_strokeTexture_tmp = is_function_constant_defined(SC_USE_CLAMP_TO_BORDER_strokeTexture) ? SC_USE_CLAMP_TO_BORDER_strokeTexture : false;
constant bool SC_USE_UV_MIN_MAX_baseTex [[function_constant(35)]];
constant bool SC_USE_UV_MIN_MAX_baseTex_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_baseTex) ? SC_USE_UV_MIN_MAX_baseTex : false;
constant bool SC_USE_UV_MIN_MAX_intensityTexture [[function_constant(36)]];
constant bool SC_USE_UV_MIN_MAX_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_intensityTexture) ? SC_USE_UV_MIN_MAX_intensityTexture : false;
constant bool SC_USE_UV_MIN_MAX_shapeTexture [[function_constant(37)]];
constant bool SC_USE_UV_MIN_MAX_shapeTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_shapeTexture) ? SC_USE_UV_MIN_MAX_shapeTexture : false;
constant bool SC_USE_UV_MIN_MAX_strokeTexture [[function_constant(38)]];
constant bool SC_USE_UV_MIN_MAX_strokeTexture_tmp = is_function_constant_defined(SC_USE_UV_MIN_MAX_strokeTexture) ? SC_USE_UV_MIN_MAX_strokeTexture : false;
constant bool SC_USE_UV_TRANSFORM_baseTex [[function_constant(39)]];
constant bool SC_USE_UV_TRANSFORM_baseTex_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_baseTex) ? SC_USE_UV_TRANSFORM_baseTex : false;
constant bool SC_USE_UV_TRANSFORM_intensityTexture [[function_constant(40)]];
constant bool SC_USE_UV_TRANSFORM_intensityTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_intensityTexture) ? SC_USE_UV_TRANSFORM_intensityTexture : false;
constant bool SC_USE_UV_TRANSFORM_shapeTexture [[function_constant(41)]];
constant bool SC_USE_UV_TRANSFORM_shapeTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_shapeTexture) ? SC_USE_UV_TRANSFORM_shapeTexture : false;
constant bool SC_USE_UV_TRANSFORM_strokeTexture [[function_constant(42)]];
constant bool SC_USE_UV_TRANSFORM_strokeTexture_tmp = is_function_constant_defined(SC_USE_UV_TRANSFORM_strokeTexture) ? SC_USE_UV_TRANSFORM_strokeTexture : false;
constant bool Tweak_N124 [[function_constant(43)]];
constant bool Tweak_N124_tmp = is_function_constant_defined(Tweak_N124) ? Tweak_N124 : false;
constant bool Tweak_N139 [[function_constant(44)]];
constant bool Tweak_N139_tmp = is_function_constant_defined(Tweak_N139) ? Tweak_N139 : false;
constant bool UseViewSpaceDepthVariant [[function_constant(45)]];
constant bool UseViewSpaceDepthVariant_tmp = is_function_constant_defined(UseViewSpaceDepthVariant) ? UseViewSpaceDepthVariant : true;
constant bool baseTexHasSwappedViews [[function_constant(46)]];
constant bool baseTexHasSwappedViews_tmp = is_function_constant_defined(baseTexHasSwappedViews) ? baseTexHasSwappedViews : false;
constant bool innerCutout [[function_constant(47)]];
constant bool innerCutout_tmp = is_function_constant_defined(innerCutout) ? innerCutout : false;
constant bool intensityTextureHasSwappedViews [[function_constant(48)]];
constant bool intensityTextureHasSwappedViews_tmp = is_function_constant_defined(intensityTextureHasSwappedViews) ? intensityTextureHasSwappedViews : false;
constant bool sc_BlendMode_AddWithAlphaFactor [[function_constant(49)]];
constant bool sc_BlendMode_AddWithAlphaFactor_tmp = is_function_constant_defined(sc_BlendMode_AddWithAlphaFactor) ? sc_BlendMode_AddWithAlphaFactor : false;
constant bool sc_BlendMode_Add [[function_constant(50)]];
constant bool sc_BlendMode_Add_tmp = is_function_constant_defined(sc_BlendMode_Add) ? sc_BlendMode_Add : false;
constant bool sc_BlendMode_AlphaTest [[function_constant(51)]];
constant bool sc_BlendMode_AlphaTest_tmp = is_function_constant_defined(sc_BlendMode_AlphaTest) ? sc_BlendMode_AlphaTest : false;
constant bool sc_BlendMode_AlphaToCoverage [[function_constant(52)]];
constant bool sc_BlendMode_AlphaToCoverage_tmp = is_function_constant_defined(sc_BlendMode_AlphaToCoverage) ? sc_BlendMode_AlphaToCoverage : false;
constant bool sc_BlendMode_ColoredGlass [[function_constant(53)]];
constant bool sc_BlendMode_ColoredGlass_tmp = is_function_constant_defined(sc_BlendMode_ColoredGlass) ? sc_BlendMode_ColoredGlass : false;
constant bool sc_BlendMode_Custom [[function_constant(54)]];
constant bool sc_BlendMode_Custom_tmp = is_function_constant_defined(sc_BlendMode_Custom) ? sc_BlendMode_Custom : false;
constant bool sc_BlendMode_Max [[function_constant(55)]];
constant bool sc_BlendMode_Max_tmp = is_function_constant_defined(sc_BlendMode_Max) ? sc_BlendMode_Max : false;
constant bool sc_BlendMode_Min [[function_constant(56)]];
constant bool sc_BlendMode_Min_tmp = is_function_constant_defined(sc_BlendMode_Min) ? sc_BlendMode_Min : false;
constant bool sc_BlendMode_MultiplyOriginal [[function_constant(57)]];
constant bool sc_BlendMode_MultiplyOriginal_tmp = is_function_constant_defined(sc_BlendMode_MultiplyOriginal) ? sc_BlendMode_MultiplyOriginal : false;
constant bool sc_BlendMode_Multiply [[function_constant(58)]];
constant bool sc_BlendMode_Multiply_tmp = is_function_constant_defined(sc_BlendMode_Multiply) ? sc_BlendMode_Multiply : false;
constant bool sc_BlendMode_Normal [[function_constant(59)]];
constant bool sc_BlendMode_Normal_tmp = is_function_constant_defined(sc_BlendMode_Normal) ? sc_BlendMode_Normal : false;
constant bool sc_BlendMode_PremultipliedAlphaAuto [[function_constant(60)]];
constant bool sc_BlendMode_PremultipliedAlphaAuto_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaAuto) ? sc_BlendMode_PremultipliedAlphaAuto : false;
constant bool sc_BlendMode_PremultipliedAlphaHardware [[function_constant(61)]];
constant bool sc_BlendMode_PremultipliedAlphaHardware_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlphaHardware) ? sc_BlendMode_PremultipliedAlphaHardware : false;
constant bool sc_BlendMode_PremultipliedAlpha [[function_constant(62)]];
constant bool sc_BlendMode_PremultipliedAlpha_tmp = is_function_constant_defined(sc_BlendMode_PremultipliedAlpha) ? sc_BlendMode_PremultipliedAlpha : false;
constant bool sc_BlendMode_Screen [[function_constant(63)]];
constant bool sc_BlendMode_Screen_tmp = is_function_constant_defined(sc_BlendMode_Screen) ? sc_BlendMode_Screen : false;
constant bool sc_DepthOnly [[function_constant(64)]];
constant bool sc_DepthOnly_tmp = is_function_constant_defined(sc_DepthOnly) ? sc_DepthOnly : false;
constant bool sc_FramebufferFetch [[function_constant(65)]];
constant bool sc_FramebufferFetch_tmp = is_function_constant_defined(sc_FramebufferFetch) ? sc_FramebufferFetch : false;
constant bool sc_MotionVectorsPass [[function_constant(66)]];
constant bool sc_MotionVectorsPass_tmp = is_function_constant_defined(sc_MotionVectorsPass) ? sc_MotionVectorsPass : false;
constant bool sc_OITCompositingPass [[function_constant(67)]];
constant bool sc_OITCompositingPass_tmp = is_function_constant_defined(sc_OITCompositingPass) ? sc_OITCompositingPass : false;
constant bool sc_OITDepthBoundsPass [[function_constant(68)]];
constant bool sc_OITDepthBoundsPass_tmp = is_function_constant_defined(sc_OITDepthBoundsPass) ? sc_OITDepthBoundsPass : false;
constant bool sc_OITDepthGatherPass [[function_constant(69)]];
constant bool sc_OITDepthGatherPass_tmp = is_function_constant_defined(sc_OITDepthGatherPass) ? sc_OITDepthGatherPass : false;
constant bool sc_OutputBounds [[function_constant(70)]];
constant bool sc_OutputBounds_tmp = is_function_constant_defined(sc_OutputBounds) ? sc_OutputBounds : false;
constant bool sc_ProjectiveShadowsCaster [[function_constant(71)]];
constant bool sc_ProjectiveShadowsCaster_tmp = is_function_constant_defined(sc_ProjectiveShadowsCaster) ? sc_ProjectiveShadowsCaster : false;
constant bool sc_ProjectiveShadowsReceiver [[function_constant(72)]];
constant bool sc_ProjectiveShadowsReceiver_tmp = is_function_constant_defined(sc_ProjectiveShadowsReceiver) ? sc_ProjectiveShadowsReceiver : false;
constant bool sc_RayTracingCasterForceOpaque [[function_constant(73)]];
constant bool sc_RayTracingCasterForceOpaque_tmp = is_function_constant_defined(sc_RayTracingCasterForceOpaque) ? sc_RayTracingCasterForceOpaque : false;
constant bool sc_RenderAlphaToColor [[function_constant(74)]];
constant bool sc_RenderAlphaToColor_tmp = is_function_constant_defined(sc_RenderAlphaToColor) ? sc_RenderAlphaToColor : false;
constant bool sc_ScreenTextureHasSwappedViews [[function_constant(75)]];
constant bool sc_ScreenTextureHasSwappedViews_tmp = is_function_constant_defined(sc_ScreenTextureHasSwappedViews) ? sc_ScreenTextureHasSwappedViews : false;
constant bool sc_TAAEnabled [[function_constant(76)]];
constant bool sc_TAAEnabled_tmp = is_function_constant_defined(sc_TAAEnabled) ? sc_TAAEnabled : false;
constant bool sc_VertexBlendingUseNormals [[function_constant(77)]];
constant bool sc_VertexBlendingUseNormals_tmp = is_function_constant_defined(sc_VertexBlendingUseNormals) ? sc_VertexBlendingUseNormals : false;
constant bool sc_VertexBlending [[function_constant(78)]];
constant bool sc_VertexBlending_tmp = is_function_constant_defined(sc_VertexBlending) ? sc_VertexBlending : false;
constant bool sc_Voxelization [[function_constant(79)]];
constant bool sc_Voxelization_tmp = is_function_constant_defined(sc_Voxelization) ? sc_Voxelization : false;
constant bool shapeAspectFix [[function_constant(80)]];
constant bool shapeAspectFix_tmp = is_function_constant_defined(shapeAspectFix) ? shapeAspectFix : false;
constant bool shapeColorInvert [[function_constant(81)]];
constant bool shapeColorInvert_tmp = is_function_constant_defined(shapeColorInvert) ? shapeColorInvert : false;
constant bool shapeTextureHasSwappedViews [[function_constant(82)]];
constant bool shapeTextureHasSwappedViews_tmp = is_function_constant_defined(shapeTextureHasSwappedViews) ? shapeTextureHasSwappedViews : false;
constant bool strokeTextureHasSwappedViews [[function_constant(83)]];
constant bool strokeTextureHasSwappedViews_tmp = is_function_constant_defined(strokeTextureHasSwappedViews) ? strokeTextureHasSwappedViews : false;
constant bool toQuadShapeGrad [[function_constant(84)]];
constant bool toQuadShapeGrad_tmp = is_function_constant_defined(toQuadShapeGrad) ? toQuadShapeGrad : false;
constant bool toQuadStrokeGrad [[function_constant(85)]];
constant bool toQuadStrokeGrad_tmp = is_function_constant_defined(toQuadStrokeGrad) ? toQuadStrokeGrad : false;
constant int NODE_161_DROPLIST_ITEM [[function_constant(86)]];
constant int NODE_161_DROPLIST_ITEM_tmp = is_function_constant_defined(NODE_161_DROPLIST_ITEM) ? NODE_161_DROPLIST_ITEM : 0;
constant int NODE_164_DROPLIST_ITEM [[function_constant(87)]];
constant int NODE_164_DROPLIST_ITEM_tmp = is_function_constant_defined(NODE_164_DROPLIST_ITEM) ? NODE_164_DROPLIST_ITEM : 0;
constant int SC_SOFTWARE_WRAP_MODE_U_baseTex [[function_constant(88)]];
constant int SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_baseTex) ? SC_SOFTWARE_WRAP_MODE_U_baseTex : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture [[function_constant(89)]];
constant int SC_SOFTWARE_WRAP_MODE_U_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_U_intensityTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_shapeTexture [[function_constant(90)]];
constant int SC_SOFTWARE_WRAP_MODE_U_shapeTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_shapeTexture) ? SC_SOFTWARE_WRAP_MODE_U_shapeTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_U_strokeTexture [[function_constant(91)]];
constant int SC_SOFTWARE_WRAP_MODE_U_strokeTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_U_strokeTexture) ? SC_SOFTWARE_WRAP_MODE_U_strokeTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_baseTex [[function_constant(92)]];
constant int SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_baseTex) ? SC_SOFTWARE_WRAP_MODE_V_baseTex : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture [[function_constant(93)]];
constant int SC_SOFTWARE_WRAP_MODE_V_intensityTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_intensityTexture) ? SC_SOFTWARE_WRAP_MODE_V_intensityTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_shapeTexture [[function_constant(94)]];
constant int SC_SOFTWARE_WRAP_MODE_V_shapeTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_shapeTexture) ? SC_SOFTWARE_WRAP_MODE_V_shapeTexture : -1;
constant int SC_SOFTWARE_WRAP_MODE_V_strokeTexture [[function_constant(95)]];
constant int SC_SOFTWARE_WRAP_MODE_V_strokeTexture_tmp = is_function_constant_defined(SC_SOFTWARE_WRAP_MODE_V_strokeTexture) ? SC_SOFTWARE_WRAP_MODE_V_strokeTexture : -1;
constant int baseTexLayout [[function_constant(96)]];
constant int baseTexLayout_tmp = is_function_constant_defined(baseTexLayout) ? baseTexLayout : 0;
constant int intensityTextureLayout [[function_constant(97)]];
constant int intensityTextureLayout_tmp = is_function_constant_defined(intensityTextureLayout) ? intensityTextureLayout : 0;
constant int sc_DepthBufferMode [[function_constant(98)]];
constant int sc_DepthBufferMode_tmp = is_function_constant_defined(sc_DepthBufferMode) ? sc_DepthBufferMode : 0;
constant int sc_RenderingSpace [[function_constant(99)]];
constant int sc_RenderingSpace_tmp = is_function_constant_defined(sc_RenderingSpace) ? sc_RenderingSpace : -1;
constant int sc_ScreenTextureLayout [[function_constant(100)]];
constant int sc_ScreenTextureLayout_tmp = is_function_constant_defined(sc_ScreenTextureLayout) ? sc_ScreenTextureLayout : 0;
constant int sc_ShaderCacheConstant [[function_constant(101)]];
constant int sc_ShaderCacheConstant_tmp = is_function_constant_defined(sc_ShaderCacheConstant) ? sc_ShaderCacheConstant : 0;
constant int sc_SkinBonesCount [[function_constant(102)]];
constant int sc_SkinBonesCount_tmp = is_function_constant_defined(sc_SkinBonesCount) ? sc_SkinBonesCount : 0;
constant int sc_StereoRenderingMode [[function_constant(103)]];
constant int sc_StereoRenderingMode_tmp = is_function_constant_defined(sc_StereoRenderingMode) ? sc_StereoRenderingMode : 0;
constant int sc_StereoRendering_IsClipDistanceEnabled [[function_constant(104)]];
constant int sc_StereoRendering_IsClipDistanceEnabled_tmp = is_function_constant_defined(sc_StereoRendering_IsClipDistanceEnabled) ? sc_StereoRendering_IsClipDistanceEnabled : 0;
constant int shapeTextureLayout [[function_constant(105)]];
constant int shapeTextureLayout_tmp = is_function_constant_defined(shapeTextureLayout) ? shapeTextureLayout : 0;
constant int strokeTextureLayout [[function_constant(106)]];
constant int strokeTextureLayout_tmp = is_function_constant_defined(strokeTextureLayout) ? strokeTextureLayout : 0;

namespace SNAP_VS {
struct sc_Vertex_t
{
float4 position;
float3 normal;
float3 tangent;
float2 texture0;
float2 texture1;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float shaderComplexityValue;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
uint4 sc_RayTracingCasterConfiguration;
uint4 sc_RayTracingCasterOffsetPNTC;
uint4 sc_RayTracingCasterOffsetTexture;
uint4 sc_RayTracingCasterFormatPNTC;
uint4 sc_RayTracingCasterFormatTexture;
float4 sc_RayTracingRayDirectionSize;
float4 sc_RayTracingRayDirectionDims;
float4 sc_RayTracingRayDirectionView;
float4 voxelization_params_0;
float4 voxelization_params_frustum_lrbt;
float4 voxelization_params_frustum_nf;
float3 voxelization_params_camera_pos;
float4x4 sc_ModelMatrixVoxelization;
float correctedIntensity;
float4 intensityTextureSize;
float4 intensityTextureDims;
float4 intensityTextureView;
float3x3 intensityTextureTransform;
float4 intensityTextureUvMinMax;
float4 intensityTextureBorderColor;
float reflBlurWidth;
float reflBlurMinRough;
float reflBlurMaxRough;
int overrideTimeEnabled;
float overrideTimeElapsed[32];
float overrideTimeDelta;
int PreviewEnabled;
int PreviewNodeID;
float alphaTestThreshold;
int Active;
int Hover;
float4 shadowColor;
float shapeAlpha;
float shapeWidthX;
int xRightPin;
float strokeThickness;
int xLeftPin;
float xOffset;
float shapeHeightY;
int yUpPin;
int yDownPin;
float yOffset;
float shadowRotation;
float shadowDistance;
float shapeRotation;
float shadowBlur;
float shapeRoundness;
float strokeAlpha;
float shadowAlpha;
float4 shapeColor;
float4 shapeTextureSize;
float4 shapeTextureDims;
float4 shapeTextureView;
float3x3 shapeTextureTransform;
float4 shapeTextureUvMinMax;
float4 shapeTextureBorderColor;
float2 shapeScale;
float2 shapeOffset;
float4 shapeGradColorA;
float4 shapeGradColorB;
float2 shapeScaleGrad;
float2 shapeGradPointA;
float2 shapeGradPointB;
float2 shapeQuadOffset;
float4 shapeGradColorC;
float4 shapeGradColorD;
float4 strokeColor;
float4 strokeTextureSize;
float4 strokeTextureDims;
float4 strokeTextureView;
float3x3 strokeTextureTransform;
float4 strokeTextureUvMinMax;
float4 strokeTextureBorderColor;
float2 strokeScale;
float2 strokeOffset;
float4 shapeGradColorA2;
float4 shapeGradColorB2;
float2 shapeScaleGrad2;
float2 shapeGradPointA2;
float2 shapeGradPointB2;
float2 shapeQuadOffset2;
float4 shapeGradColorC2;
float4 shapeGradColorD2;
float4 baseTexSize;
float4 baseTexDims;
float4 baseTexView;
float3x3 baseTexTransform;
float4 baseTexUvMinMax;
float4 baseTexBorderColor;
float Port_RangeMinA_N136;
float Port_RangeMaxA_N136;
float Port_RangeMinB_N136;
float Port_RangeMaxB_N136;
float4 Port_Default_N126;
float4 Port_Value0_N154;
float Port_Value1_N157;
float4 Port_Default_N154;
float2 Port_Input2_N148;
float Port_Import_N311;
float Port_RangeMinA_N268;
float Port_RangeMaxA_N268;
float Port_Import_N316;
float Port_Value0_N287;
float Port_Import_N314;
float Port_Value_N288;
float Port_Import_N312;
float Port_RangeMinA_N276;
float Port_RangeMaxA_N276;
float Port_RangeMinB_N276;
float Port_RangeMaxB_N276;
float Port_Default_N294;
float Port_Default_N287;
float Port_Import_N313;
float Port_Value0_N281;
float Port_RangeMinA_N295;
float Port_RangeMaxA_N295;
float Port_RangeMinB_N295;
float Port_RangeMaxB_N295;
float Port_Default_N296;
float Port_Default_N281;
float Port_Import_N317;
float Port_Value0_N282;
float Port_Value1_N282;
float Port_Default_N282;
float Port_Value0_N308;
float Port_Value0_N304;
float Port_RangeMinA_N303;
float Port_RangeMaxA_N303;
float Port_RangeMinB_N303;
float Port_RangeMaxB_N303;
float Port_Default_N304;
float Port_Default_N308;
float Port_Import_N318;
float Port_RangeMinA_N277;
float Port_RangeMaxA_N277;
float Port_Import_N320;
float Port_Value0_N289;
float Port_RangeMinA_N299;
float Port_RangeMaxA_N299;
float Port_RangeMinB_N299;
float Port_RangeMaxB_N299;
float Port_Default_N297;
float Port_Default_N289;
float Port_Import_N319;
float Port_Value0_N286;
float Port_RangeMinA_N300;
float Port_RangeMaxA_N300;
float Port_RangeMinB_N300;
float Port_RangeMaxB_N300;
float Port_Default_N298;
float Port_Default_N286;
float Port_Import_N315;
float Port_Value0_N293;
float Port_Value1_N293;
float Port_Default_N293;
float Port_Value0_N301;
float Port_Value0_N306;
float Port_RangeMinA_N305;
float Port_RangeMaxA_N305;
float Port_RangeMinB_N305;
float Port_RangeMaxB_N305;
float Port_Default_N306;
float Port_Default_N301;
float Port_Value0_N132;
float Port_Input1_N141;
float Port_Default_N132;
float2 Port_Center_N092;
float Port_Value1_N097;
float Port_Value0_N131;
float Port_Default_N131;
float Port_Input1_N160;
float Port_Input1_N263;
float2 Port_Center_N094;
float2 Port_Center_N100;
float Port_Value0_N125;
float Port_Default_N125;
float Port_RangeMinA_N138;
float Port_RangeMaxA_N138;
float Port_RangeMinB_N138;
float Port_RangeMaxB_N138;
float2 Port_Center_N137;
float Port_Input1_N019;
float Port_Input1_N020;
float Port_RangeMinA_N021;
float Port_RangeMaxA_N021;
float Port_RangeMinB_N021;
float Port_Value0_N122;
float Port_Default_N122;
float Port_Input1_N056;
float Port_RangeMinA_N022;
float Port_RangeMaxA_N022;
float Port_RangeMinB_N022;
float Port_Input1_N030;
float2 Port_Input1_N032;
float Port_RangeMinA_N135;
float Port_RangeMaxA_N135;
float Port_Input1_N127;
float Port_RangeMaxB_N135;
float Port_Input1_N038;
float Port_Input2_N038;
float Port_Input1_N264;
float Port_Input2_N264;
float Port_RangeMinA_N039;
float Port_RangeMaxA_N039;
float Port_RangeMaxB_N039;
float Port_RangeMinA_N042;
float Port_RangeMaxA_N042;
float Port_RangeMaxB_N042;
float Port_RangeMinA_N047;
float Port_RangeMaxA_N047;
float Port_RangeMinA_N101;
float Port_RangeMaxA_N101;
float Port_RangeMinB_N101;
float Port_RangeMinA_N057;
float Port_RangeMaxA_N057;
float Port_RangeMinB_N057;
float Port_RangeMaxB_N057;
float Port_RangeMaxB_N047;
float Port_Input1_N051;
float2 Port_Input1_N053;
float Port_RangeMinA_N133;
float Port_RangeMaxA_N133;
float Port_RangeMaxB_N133;
float Port_Input1_N064;
float Port_Input2_N064;
float Port_Input1_N066;
float Port_Input2_N066;
float Port_Value0_N068;
float Port_Default_N068;
float Port_Input1_N072;
float Port_Input2_N072;
float Port_Value0_N123;
float Port_Default_N123;
float Port_Input1_N259;
float2 Port_Center_N113;
float Port_Input1_N089;
float Port_Input1_N090;
float Port_Input1_N103;
float2 Port_Input1_N105;
float Port_Input1_N112;
float Port_Input2_N112;
float4 Port_Import_N158;
float4 Port_Import_N159;
float Port_Input0_N186;
float Port_Input1_N186;
float Port_RangeMinA_N175;
float Port_RangeMaxA_N175;
float Port_RangeMinB_N175;
float Port_RangeMaxB_N175;
float2 Port_Import_N176;
float2 Port_Center_N177;
float2 Port_Import_N178;
float2 Port_Import_N180;
float Port_Input1_N185;
float Port_Input2_N185;
float4 Port_Import_N195;
float4 Port_Import_N196;
float Port_RangeMinA_N198;
float Port_RangeMaxA_N198;
float Port_RangeMinB_N198;
float Port_RangeMaxB_N198;
float2 Port_Import_N199;
float2 Port_Import_N200;
float4 Port_Import_N204;
float4 Port_Import_N205;
float4 Port_Default_N209;
float4 Port_Default_N149;
float Port_Input1_N265;
float Port_Input2_N265;
float Port_Input1_N098;
float2 Port_Input1_N115;
float Port_Input1_N142;
float Port_Input2_N142;
float Port_Input1_N144;
float Port_Input2_N144;
float Port_RangeMinA_N171;
float Port_RangeMaxA_N171;
float4 Port_Value0_N325;
float4 Port_Import_N228;
float4 Port_Import_N229;
float Port_Input0_N242;
float Port_Input1_N242;
float Port_RangeMinA_N231;
float Port_RangeMaxA_N231;
float Port_RangeMinB_N231;
float Port_RangeMaxB_N231;
float2 Port_Import_N232;
float2 Port_Center_N233;
float2 Port_Import_N234;
float2 Port_Import_N236;
float Port_Input1_N241;
float Port_Input2_N241;
float4 Port_Import_N249;
float4 Port_Import_N250;
float Port_RangeMinA_N252;
float Port_RangeMaxA_N252;
float Port_RangeMinB_N252;
float Port_RangeMaxB_N252;
float2 Port_Import_N253;
float2 Port_Import_N254;
float4 Port_Import_N258;
float4 Port_Import_N262;
float4 Port_Default_N323;
float4 Port_Default_N324;
float4 Port_Default_N325;
float Port_Input1_N335;
float4 Port_Input1_N345;
float4 Port_Import_N353;
float4 Port_Input_N339;
float2 Port_Scale_N340;
float2 Port_Center_N340;
float4 Port_Input_N006;
float4 Port_Import_N355;
float Port_Input1_N361;
float Port_Input2_N361;
float depthRef;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct ssPreviewInfo
{
float4 Color;
bool Saved;
};
struct sc_RayTracingCasterIndexBuffer_obj
{
uint sc_RayTracingCasterTriangles[1];
};
struct sc_RayTracingCasterVertexBuffer_obj
{
float sc_RayTracingCasterVertices[1];
};
struct sc_RayTracingCasterNonAnimatedVertexBuffer_obj
{
float sc_RayTracingCasterNonAnimatedVertices[1];
};
struct sc_Set0
{
const device sc_RayTracingCasterIndexBuffer_obj* sc_RayTracingCasterIndexBuffer [[id(0)]];
const device sc_RayTracingCasterVertexBuffer_obj* sc_RayTracingCasterVertexBuffer [[id(1)]];
const device sc_RayTracingCasterNonAnimatedVertexBuffer_obj* sc_RayTracingCasterNonAnimatedVertexBuffer [[id(2)]];
constant sc_Bones_obj* sc_BonesUBO [[id(3)]];
texture2d<float> baseTex [[id(4)]];
texture2d<float> intensityTexture [[id(5)]];
texture2d<uint> sc_RayTracingHitCasterIdAndBarycentric [[id(16)]];
texture2d<float> sc_RayTracingRayDirection [[id(17)]];
texture2d<float> sc_ScreenTexture [[id(19)]];
texture2d<float> shapeTexture [[id(22)]];
texture2d<float> strokeTexture [[id(23)]];
sampler baseTexSmpSC [[id(24)]];
sampler intensityTextureSmpSC [[id(25)]];
sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC [[id(29)]];
sampler sc_RayTracingRayDirectionSmpSC [[id(30)]];
sampler sc_ScreenTextureSmpSC [[id(32)]];
sampler shapeTextureSmpSC [[id(35)]];
sampler strokeTextureSmpSC [[id(36)]];
constant userUniformsObj* UserUniforms [[id(37)]];
};
struct main_vert_out
{
float4 varPosAndMotion [[user(locn0)]];
float4 varNormalAndMotion [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varTex01 [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 varColor [[user(locn10)]];
float4 PreviewVertexColor [[user(locn11)]];
float PreviewVertexSaved [[user(locn12)]];
float4 gl_Position [[position]];
};
struct main_vert_in
{
float4 position [[attribute(0)]];
float3 normal [[attribute(1)]];
float4 tangent [[attribute(2)]];
float2 texture0 [[attribute(3)]];
float2 texture1 [[attribute(4)]];
float4 boneData [[attribute(5)]];
float3 blendShape0Pos [[attribute(6)]];
float3 blendShape1Pos [[attribute(7)]];
float3 blendShape2Pos [[attribute(8)]];
float3 blendShape3Pos [[attribute(9)]];
float3 blendShape4Pos [[attribute(10)]];
float3 blendShape5Pos [[attribute(11)]];
float3 blendShape0Normal [[attribute(12)]];
float3 blendShape1Normal [[attribute(13)]];
float3 blendShape2Normal [[attribute(14)]];
float3 positionNext [[attribute(15)]];
float3 positionPrevious [[attribute(16)]];
float4 strandProperties [[attribute(17)]];
float4 color [[attribute(18)]];
};
vertex main_vert_out main_vert(main_vert_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],uint gl_InstanceIndex [[instance_id]])
{
main_vert_out out={};
if ((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.x!=0u)
{
float4 param=float4(in.position.xy,(*sc_set0.UserUniforms).depthRef+(1e-10*in.position.z),1.0+(1e-10*in.position.w));
if (sc_ShaderCacheConstant_tmp!=0)
{
param.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_0=param;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_1=dot(l9_0,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_2=l9_1;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_2;
}
}
float4 l9_3=float4(param.x,-param.y,(param.z*0.5)+(param.w*0.5),param.w);
out.gl_Position=l9_3;
return out;
}
out.PreviewVertexColor=float4(0.5);
ssPreviewInfo PreviewInfo;
PreviewInfo.Color=float4(0.5);
PreviewInfo.Saved=false;
out.PreviewVertexSaved=0.0;
sc_Vertex_t l9_5;
l9_5.position=in.position;
l9_5.normal=in.normal;
l9_5.tangent=in.tangent.xyz;
l9_5.texture0=in.texture0;
l9_5.texture1=in.texture1;
sc_Vertex_t l9_6=l9_5;
sc_Vertex_t param_1=l9_6;
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_7=param_1;
param_1=l9_7;
}
sc_Vertex_t l9_8=param_1;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_9=l9_8;
float3 l9_10=in.blendShape0Pos;
float3 l9_11=in.blendShape0Normal;
float l9_12=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_13=l9_9;
float3 l9_14=l9_10;
float l9_15=l9_12;
float3 l9_16=l9_13.position.xyz+(l9_14*l9_15);
l9_13.position=float4(l9_16.x,l9_16.y,l9_16.z,l9_13.position.w);
l9_9=l9_13;
l9_9.normal+=(l9_11*l9_12);
l9_8=l9_9;
sc_Vertex_t l9_17=l9_8;
float3 l9_18=in.blendShape1Pos;
float3 l9_19=in.blendShape1Normal;
float l9_20=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_21=l9_17;
float3 l9_22=l9_18;
float l9_23=l9_20;
float3 l9_24=l9_21.position.xyz+(l9_22*l9_23);
l9_21.position=float4(l9_24.x,l9_24.y,l9_24.z,l9_21.position.w);
l9_17=l9_21;
l9_17.normal+=(l9_19*l9_20);
l9_8=l9_17;
sc_Vertex_t l9_25=l9_8;
float3 l9_26=in.blendShape2Pos;
float3 l9_27=in.blendShape2Normal;
float l9_28=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_29=l9_25;
float3 l9_30=l9_26;
float l9_31=l9_28;
float3 l9_32=l9_29.position.xyz+(l9_30*l9_31);
l9_29.position=float4(l9_32.x,l9_32.y,l9_32.z,l9_29.position.w);
l9_25=l9_29;
l9_25.normal+=(l9_27*l9_28);
l9_8=l9_25;
}
else
{
sc_Vertex_t l9_33=l9_8;
float3 l9_34=in.blendShape0Pos;
float l9_35=(*sc_set0.UserUniforms).weights0.x;
float3 l9_36=l9_33.position.xyz+(l9_34*l9_35);
l9_33.position=float4(l9_36.x,l9_36.y,l9_36.z,l9_33.position.w);
l9_8=l9_33;
sc_Vertex_t l9_37=l9_8;
float3 l9_38=in.blendShape1Pos;
float l9_39=(*sc_set0.UserUniforms).weights0.y;
float3 l9_40=l9_37.position.xyz+(l9_38*l9_39);
l9_37.position=float4(l9_40.x,l9_40.y,l9_40.z,l9_37.position.w);
l9_8=l9_37;
sc_Vertex_t l9_41=l9_8;
float3 l9_42=in.blendShape2Pos;
float l9_43=(*sc_set0.UserUniforms).weights0.z;
float3 l9_44=l9_41.position.xyz+(l9_42*l9_43);
l9_41.position=float4(l9_44.x,l9_44.y,l9_44.z,l9_41.position.w);
l9_8=l9_41;
sc_Vertex_t l9_45=l9_8;
float3 l9_46=in.blendShape3Pos;
float l9_47=(*sc_set0.UserUniforms).weights0.w;
float3 l9_48=l9_45.position.xyz+(l9_46*l9_47);
l9_45.position=float4(l9_48.x,l9_48.y,l9_48.z,l9_45.position.w);
l9_8=l9_45;
sc_Vertex_t l9_49=l9_8;
float3 l9_50=in.blendShape4Pos;
float l9_51=(*sc_set0.UserUniforms).weights1.x;
float3 l9_52=l9_49.position.xyz+(l9_50*l9_51);
l9_49.position=float4(l9_52.x,l9_52.y,l9_52.z,l9_49.position.w);
l9_8=l9_49;
sc_Vertex_t l9_53=l9_8;
float3 l9_54=in.blendShape5Pos;
float l9_55=(*sc_set0.UserUniforms).weights1.y;
float3 l9_56=l9_53.position.xyz+(l9_54*l9_55);
l9_53.position=float4(l9_56.x,l9_56.y,l9_56.z,l9_53.position.w);
l9_8=l9_53;
}
}
param_1=l9_8;
sc_Vertex_t l9_57=param_1;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_58=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_58=float4(1.0,fract(in.boneData.yzw));
l9_58.x-=dot(l9_58.yzw,float3(1.0));
}
float4 l9_59=l9_58;
float4 l9_60=l9_59;
int l9_61=int(in.boneData.x);
int l9_62=int(in.boneData.y);
int l9_63=int(in.boneData.z);
int l9_64=int(in.boneData.w);
int l9_65=l9_61;
float4 l9_66=l9_57.position;
float3 l9_67=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_68=l9_65;
float4 l9_69=(*sc_set0.sc_BonesUBO).sc_Bones[l9_68].boneMatrix[0];
float4 l9_70=(*sc_set0.sc_BonesUBO).sc_Bones[l9_68].boneMatrix[1];
float4 l9_71=(*sc_set0.sc_BonesUBO).sc_Bones[l9_68].boneMatrix[2];
float4 l9_72[3];
l9_72[0]=l9_69;
l9_72[1]=l9_70;
l9_72[2]=l9_71;
l9_67=float3(dot(l9_66,l9_72[0]),dot(l9_66,l9_72[1]),dot(l9_66,l9_72[2]));
}
else
{
l9_67=l9_66.xyz;
}
float3 l9_73=l9_67;
float3 l9_74=l9_73;
float l9_75=l9_60.x;
int l9_76=l9_62;
float4 l9_77=l9_57.position;
float3 l9_78=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_79=l9_76;
float4 l9_80=(*sc_set0.sc_BonesUBO).sc_Bones[l9_79].boneMatrix[0];
float4 l9_81=(*sc_set0.sc_BonesUBO).sc_Bones[l9_79].boneMatrix[1];
float4 l9_82=(*sc_set0.sc_BonesUBO).sc_Bones[l9_79].boneMatrix[2];
float4 l9_83[3];
l9_83[0]=l9_80;
l9_83[1]=l9_81;
l9_83[2]=l9_82;
l9_78=float3(dot(l9_77,l9_83[0]),dot(l9_77,l9_83[1]),dot(l9_77,l9_83[2]));
}
else
{
l9_78=l9_77.xyz;
}
float3 l9_84=l9_78;
float3 l9_85=l9_84;
float l9_86=l9_60.y;
int l9_87=l9_63;
float4 l9_88=l9_57.position;
float3 l9_89=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_90=l9_87;
float4 l9_91=(*sc_set0.sc_BonesUBO).sc_Bones[l9_90].boneMatrix[0];
float4 l9_92=(*sc_set0.sc_BonesUBO).sc_Bones[l9_90].boneMatrix[1];
float4 l9_93=(*sc_set0.sc_BonesUBO).sc_Bones[l9_90].boneMatrix[2];
float4 l9_94[3];
l9_94[0]=l9_91;
l9_94[1]=l9_92;
l9_94[2]=l9_93;
l9_89=float3(dot(l9_88,l9_94[0]),dot(l9_88,l9_94[1]),dot(l9_88,l9_94[2]));
}
else
{
l9_89=l9_88.xyz;
}
float3 l9_95=l9_89;
float3 l9_96=l9_95;
float l9_97=l9_60.z;
int l9_98=l9_64;
float4 l9_99=l9_57.position;
float3 l9_100=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_101=l9_98;
float4 l9_102=(*sc_set0.sc_BonesUBO).sc_Bones[l9_101].boneMatrix[0];
float4 l9_103=(*sc_set0.sc_BonesUBO).sc_Bones[l9_101].boneMatrix[1];
float4 l9_104=(*sc_set0.sc_BonesUBO).sc_Bones[l9_101].boneMatrix[2];
float4 l9_105[3];
l9_105[0]=l9_102;
l9_105[1]=l9_103;
l9_105[2]=l9_104;
l9_100=float3(dot(l9_99,l9_105[0]),dot(l9_99,l9_105[1]),dot(l9_99,l9_105[2]));
}
else
{
l9_100=l9_99.xyz;
}
float3 l9_106=l9_100;
float3 l9_107=(((l9_74*l9_75)+(l9_85*l9_86))+(l9_96*l9_97))+(l9_106*l9_60.w);
l9_57.position=float4(l9_107.x,l9_107.y,l9_107.z,l9_57.position.w);
int l9_108=l9_61;
float3x3 l9_109=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_108].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_108].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_108].normalMatrix[2].xyz));
float3x3 l9_110=l9_109;
float3x3 l9_111=l9_110;
int l9_112=l9_62;
float3x3 l9_113=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_112].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_112].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_112].normalMatrix[2].xyz));
float3x3 l9_114=l9_113;
float3x3 l9_115=l9_114;
int l9_116=l9_63;
float3x3 l9_117=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_116].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_116].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_116].normalMatrix[2].xyz));
float3x3 l9_118=l9_117;
float3x3 l9_119=l9_118;
int l9_120=l9_64;
float3x3 l9_121=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_120].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_120].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_120].normalMatrix[2].xyz));
float3x3 l9_122=l9_121;
float3x3 l9_123=l9_122;
l9_57.normal=((((l9_111*l9_57.normal)*l9_60.x)+((l9_115*l9_57.normal)*l9_60.y))+((l9_119*l9_57.normal)*l9_60.z))+((l9_123*l9_57.normal)*l9_60.w);
l9_57.tangent=((((l9_111*l9_57.tangent)*l9_60.x)+((l9_115*l9_57.tangent)*l9_60.y))+((l9_119*l9_57.tangent)*l9_60.z))+((l9_123*l9_57.tangent)*l9_60.w);
}
param_1=l9_57;
if (sc_RenderingSpace_tmp==3)
{
out.varPosAndMotion=float4(float3(0.0).x,float3(0.0).y,float3(0.0).z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param_1.normal.x,param_1.normal.y,param_1.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param_1.tangent.x,param_1.tangent.y,param_1.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==4)
{
out.varPosAndMotion=float4(float3(0.0).x,float3(0.0).y,float3(0.0).z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param_1.normal.x,param_1.normal.y,param_1.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param_1.tangent.x,param_1.tangent.y,param_1.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
out.varPosAndMotion=float4(param_1.position.xyz.x,param_1.position.xyz.y,param_1.position.xyz.z,out.varPosAndMotion.w);
out.varNormalAndMotion=float4(param_1.normal.x,param_1.normal.y,param_1.normal.z,out.varNormalAndMotion.w);
out.varTangent=float4(param_1.tangent.x,param_1.tangent.y,param_1.tangent.z,out.varTangent.w);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
float3 l9_124=((*sc_set0.UserUniforms).sc_ModelMatrix*param_1.position).xyz;
out.varPosAndMotion=float4(l9_124.x,l9_124.y,l9_124.z,out.varPosAndMotion.w);
float3 l9_125=(*sc_set0.UserUniforms).sc_NormalMatrix*param_1.normal;
out.varNormalAndMotion=float4(l9_125.x,l9_125.y,l9_125.z,out.varNormalAndMotion.w);
float3 l9_126=(*sc_set0.UserUniforms).sc_NormalMatrix*param_1.tangent;
out.varTangent=float4(l9_126.x,l9_126.y,l9_126.z,out.varTangent.w);
}
}
}
}
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
param_1.texture0.x=1.0-param_1.texture0.x;
}
out.varColor=in.color;
sc_Vertex_t v=param_1;
float3 WorldPosition=out.varPosAndMotion.xyz;
float3 WorldNormal=out.varNormalAndMotion.xyz;
float3 WorldTangent=out.varTangent.xyz;
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
WorldPosition=out.varPosAndMotion.xyz;
WorldNormal=out.varNormalAndMotion.xyz;
WorldTangent=out.varTangent.xyz;
}
sc_Vertex_t param_2=v;
float3 param_3=WorldPosition;
float3 param_4=WorldNormal;
float3 param_5=WorldTangent;
float4 param_6=v.position;
out.varPosAndMotion=float4(param_3.x,param_3.y,param_3.z,out.varPosAndMotion.w);
float3 l9_127=normalize(param_4);
out.varNormalAndMotion=float4(l9_127.x,l9_127.y,l9_127.z,out.varNormalAndMotion.w);
float3 l9_128=normalize(param_5);
out.varTangent=float4(l9_128.x,l9_128.y,l9_128.z,out.varTangent.w);
out.varTangent.w=in.tangent.w;
if ((int(UseViewSpaceDepthVariant_tmp)!=0)&&(((int(sc_OITDepthGatherPass_tmp)!=0)||(int(sc_OITCompositingPass_tmp)!=0))||(int(sc_OITDepthBoundsPass_tmp)!=0)))
{
float4 l9_129=param_2.position;
float4 l9_130=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
int l9_131=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_131=0;
}
else
{
l9_131=gl_InstanceIndex%2;
}
int l9_132=l9_131;
l9_130=(*sc_set0.UserUniforms).sc_ProjectionMatrixInverseArray[l9_132]*l9_129;
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_133=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_133=0;
}
else
{
l9_133=gl_InstanceIndex%2;
}
int l9_134=l9_133;
l9_130=(*sc_set0.UserUniforms).sc_ViewMatrixArray[l9_134]*l9_129;
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_135=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_135=0;
}
else
{
l9_135=gl_InstanceIndex%2;
}
int l9_136=l9_135;
l9_130=(*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_136]*l9_129;
}
else
{
l9_130=l9_129;
}
}
}
float4 l9_137=l9_130;
out.varViewSpaceDepth=-l9_137.z;
}
float4 l9_138=float4(0.0);
if (sc_RenderingSpace_tmp==3)
{
l9_138=param_6;
}
else
{
if (sc_RenderingSpace_tmp==4)
{
int l9_139=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_139=0;
}
else
{
l9_139=gl_InstanceIndex%2;
}
int l9_140=l9_139;
l9_138=((*sc_set0.UserUniforms).sc_ModelViewMatrixArray[l9_140]*param_2.position)*float4(1.0/(*sc_set0.UserUniforms).sc_Camera.aspect,1.0,1.0,1.0);
}
else
{
if (sc_RenderingSpace_tmp==2)
{
int l9_141=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_141=0;
}
else
{
l9_141=gl_InstanceIndex%2;
}
int l9_142=l9_141;
l9_138=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_142]*float4(out.varPosAndMotion.xyz,1.0);
}
else
{
if (sc_RenderingSpace_tmp==1)
{
int l9_143=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_143=0;
}
else
{
l9_143=gl_InstanceIndex%2;
}
int l9_144=l9_143;
l9_138=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_144]*float4(out.varPosAndMotion.xyz,1.0);
}
}
}
}
out.varTex01=float4(param_2.texture0,param_2.texture1);
if ((int(sc_ProjectiveShadowsReceiver_tmp)!=0))
{
float4 l9_145=param_2.position;
float4 l9_146=l9_145;
if (sc_RenderingSpace_tmp==1)
{
l9_146=(*sc_set0.UserUniforms).sc_ModelMatrix*l9_145;
}
float4 l9_147=(*sc_set0.UserUniforms).sc_ProjectorMatrix*l9_146;
float2 l9_148=((l9_147.xy/float2(l9_147.w))*0.5)+float2(0.5);
out.varShadowTex=l9_148;
}
float4 l9_149=l9_138;
if (sc_DepthBufferMode_tmp==1)
{
int l9_150=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_150=0;
}
else
{
l9_150=gl_InstanceIndex%2;
}
int l9_151=l9_150;
if ((*sc_set0.UserUniforms).sc_ProjectionMatrixArray[l9_151][2].w!=0.0)
{
float l9_152=2.0/log2((*sc_set0.UserUniforms).sc_Camera.clipPlanes.y+1.0);
l9_149.z=((log2(fast::max((*sc_set0.UserUniforms).sc_Camera.clipPlanes.x,1.0+l9_149.w))*l9_152)-1.0)*l9_149.w;
}
}
float4 l9_153=l9_149;
l9_138=l9_153;
float4 l9_154=l9_138;
if ((int(sc_TAAEnabled_tmp)!=0))
{
float2 l9_155=l9_154.xy+((*sc_set0.UserUniforms).sc_TAAJitterOffset*l9_154.w);
l9_154=float4(l9_155.x,l9_155.y,l9_154.z,l9_154.w);
}
float4 l9_156=l9_154;
l9_138=l9_156;
float4 l9_157=l9_138;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_157.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_158=l9_157;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_159=dot(l9_158,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_160=l9_159;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_160;
}
}
float4 l9_161=float4(l9_157.x,-l9_157.y,(l9_157.z*0.5)+(l9_157.w*0.5),l9_157.w);
out.gl_Position=l9_161;
if ((int(sc_Voxelization_tmp)!=0))
{
sc_Vertex_t l9_162=param_2;
sc_Vertex_t l9_163=l9_162;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_164=l9_163;
float3 l9_165=in.blendShape0Pos;
float3 l9_166=in.blendShape0Normal;
float l9_167=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_168=l9_164;
float3 l9_169=l9_165;
float l9_170=l9_167;
float3 l9_171=l9_168.position.xyz+(l9_169*l9_170);
l9_168.position=float4(l9_171.x,l9_171.y,l9_171.z,l9_168.position.w);
l9_164=l9_168;
l9_164.normal+=(l9_166*l9_167);
l9_163=l9_164;
sc_Vertex_t l9_172=l9_163;
float3 l9_173=in.blendShape1Pos;
float3 l9_174=in.blendShape1Normal;
float l9_175=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_176=l9_172;
float3 l9_177=l9_173;
float l9_178=l9_175;
float3 l9_179=l9_176.position.xyz+(l9_177*l9_178);
l9_176.position=float4(l9_179.x,l9_179.y,l9_179.z,l9_176.position.w);
l9_172=l9_176;
l9_172.normal+=(l9_174*l9_175);
l9_163=l9_172;
sc_Vertex_t l9_180=l9_163;
float3 l9_181=in.blendShape2Pos;
float3 l9_182=in.blendShape2Normal;
float l9_183=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_184=l9_180;
float3 l9_185=l9_181;
float l9_186=l9_183;
float3 l9_187=l9_184.position.xyz+(l9_185*l9_186);
l9_184.position=float4(l9_187.x,l9_187.y,l9_187.z,l9_184.position.w);
l9_180=l9_184;
l9_180.normal+=(l9_182*l9_183);
l9_163=l9_180;
}
else
{
sc_Vertex_t l9_188=l9_163;
float3 l9_189=in.blendShape0Pos;
float l9_190=(*sc_set0.UserUniforms).weights0.x;
float3 l9_191=l9_188.position.xyz+(l9_189*l9_190);
l9_188.position=float4(l9_191.x,l9_191.y,l9_191.z,l9_188.position.w);
l9_163=l9_188;
sc_Vertex_t l9_192=l9_163;
float3 l9_193=in.blendShape1Pos;
float l9_194=(*sc_set0.UserUniforms).weights0.y;
float3 l9_195=l9_192.position.xyz+(l9_193*l9_194);
l9_192.position=float4(l9_195.x,l9_195.y,l9_195.z,l9_192.position.w);
l9_163=l9_192;
sc_Vertex_t l9_196=l9_163;
float3 l9_197=in.blendShape2Pos;
float l9_198=(*sc_set0.UserUniforms).weights0.z;
float3 l9_199=l9_196.position.xyz+(l9_197*l9_198);
l9_196.position=float4(l9_199.x,l9_199.y,l9_199.z,l9_196.position.w);
l9_163=l9_196;
sc_Vertex_t l9_200=l9_163;
float3 l9_201=in.blendShape3Pos;
float l9_202=(*sc_set0.UserUniforms).weights0.w;
float3 l9_203=l9_200.position.xyz+(l9_201*l9_202);
l9_200.position=float4(l9_203.x,l9_203.y,l9_203.z,l9_200.position.w);
l9_163=l9_200;
sc_Vertex_t l9_204=l9_163;
float3 l9_205=in.blendShape4Pos;
float l9_206=(*sc_set0.UserUniforms).weights1.x;
float3 l9_207=l9_204.position.xyz+(l9_205*l9_206);
l9_204.position=float4(l9_207.x,l9_207.y,l9_207.z,l9_204.position.w);
l9_163=l9_204;
sc_Vertex_t l9_208=l9_163;
float3 l9_209=in.blendShape5Pos;
float l9_210=(*sc_set0.UserUniforms).weights1.y;
float3 l9_211=l9_208.position.xyz+(l9_209*l9_210);
l9_208.position=float4(l9_211.x,l9_211.y,l9_211.z,l9_208.position.w);
l9_163=l9_208;
}
}
l9_162=l9_163;
sc_Vertex_t l9_212=l9_162;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_213=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_213=float4(1.0,fract(in.boneData.yzw));
l9_213.x-=dot(l9_213.yzw,float3(1.0));
}
float4 l9_214=l9_213;
float4 l9_215=l9_214;
int l9_216=int(in.boneData.x);
int l9_217=int(in.boneData.y);
int l9_218=int(in.boneData.z);
int l9_219=int(in.boneData.w);
int l9_220=l9_216;
float4 l9_221=l9_212.position;
float3 l9_222=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_223=l9_220;
float4 l9_224=(*sc_set0.sc_BonesUBO).sc_Bones[l9_223].boneMatrix[0];
float4 l9_225=(*sc_set0.sc_BonesUBO).sc_Bones[l9_223].boneMatrix[1];
float4 l9_226=(*sc_set0.sc_BonesUBO).sc_Bones[l9_223].boneMatrix[2];
float4 l9_227[3];
l9_227[0]=l9_224;
l9_227[1]=l9_225;
l9_227[2]=l9_226;
l9_222=float3(dot(l9_221,l9_227[0]),dot(l9_221,l9_227[1]),dot(l9_221,l9_227[2]));
}
else
{
l9_222=l9_221.xyz;
}
float3 l9_228=l9_222;
float3 l9_229=l9_228;
float l9_230=l9_215.x;
int l9_231=l9_217;
float4 l9_232=l9_212.position;
float3 l9_233=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_234=l9_231;
float4 l9_235=(*sc_set0.sc_BonesUBO).sc_Bones[l9_234].boneMatrix[0];
float4 l9_236=(*sc_set0.sc_BonesUBO).sc_Bones[l9_234].boneMatrix[1];
float4 l9_237=(*sc_set0.sc_BonesUBO).sc_Bones[l9_234].boneMatrix[2];
float4 l9_238[3];
l9_238[0]=l9_235;
l9_238[1]=l9_236;
l9_238[2]=l9_237;
l9_233=float3(dot(l9_232,l9_238[0]),dot(l9_232,l9_238[1]),dot(l9_232,l9_238[2]));
}
else
{
l9_233=l9_232.xyz;
}
float3 l9_239=l9_233;
float3 l9_240=l9_239;
float l9_241=l9_215.y;
int l9_242=l9_218;
float4 l9_243=l9_212.position;
float3 l9_244=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_245=l9_242;
float4 l9_246=(*sc_set0.sc_BonesUBO).sc_Bones[l9_245].boneMatrix[0];
float4 l9_247=(*sc_set0.sc_BonesUBO).sc_Bones[l9_245].boneMatrix[1];
float4 l9_248=(*sc_set0.sc_BonesUBO).sc_Bones[l9_245].boneMatrix[2];
float4 l9_249[3];
l9_249[0]=l9_246;
l9_249[1]=l9_247;
l9_249[2]=l9_248;
l9_244=float3(dot(l9_243,l9_249[0]),dot(l9_243,l9_249[1]),dot(l9_243,l9_249[2]));
}
else
{
l9_244=l9_243.xyz;
}
float3 l9_250=l9_244;
float3 l9_251=l9_250;
float l9_252=l9_215.z;
int l9_253=l9_219;
float4 l9_254=l9_212.position;
float3 l9_255=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_256=l9_253;
float4 l9_257=(*sc_set0.sc_BonesUBO).sc_Bones[l9_256].boneMatrix[0];
float4 l9_258=(*sc_set0.sc_BonesUBO).sc_Bones[l9_256].boneMatrix[1];
float4 l9_259=(*sc_set0.sc_BonesUBO).sc_Bones[l9_256].boneMatrix[2];
float4 l9_260[3];
l9_260[0]=l9_257;
l9_260[1]=l9_258;
l9_260[2]=l9_259;
l9_255=float3(dot(l9_254,l9_260[0]),dot(l9_254,l9_260[1]),dot(l9_254,l9_260[2]));
}
else
{
l9_255=l9_254.xyz;
}
float3 l9_261=l9_255;
float3 l9_262=(((l9_229*l9_230)+(l9_240*l9_241))+(l9_251*l9_252))+(l9_261*l9_215.w);
l9_212.position=float4(l9_262.x,l9_262.y,l9_262.z,l9_212.position.w);
int l9_263=l9_216;
float3x3 l9_264=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_263].normalMatrix[2].xyz));
float3x3 l9_265=l9_264;
float3x3 l9_266=l9_265;
int l9_267=l9_217;
float3x3 l9_268=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_267].normalMatrix[2].xyz));
float3x3 l9_269=l9_268;
float3x3 l9_270=l9_269;
int l9_271=l9_218;
float3x3 l9_272=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_271].normalMatrix[2].xyz));
float3x3 l9_273=l9_272;
float3x3 l9_274=l9_273;
int l9_275=l9_219;
float3x3 l9_276=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_275].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_275].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_275].normalMatrix[2].xyz));
float3x3 l9_277=l9_276;
float3x3 l9_278=l9_277;
l9_212.normal=((((l9_266*l9_212.normal)*l9_215.x)+((l9_270*l9_212.normal)*l9_215.y))+((l9_274*l9_212.normal)*l9_215.z))+((l9_278*l9_212.normal)*l9_215.w);
l9_212.tangent=((((l9_266*l9_212.tangent)*l9_215.x)+((l9_270*l9_212.tangent)*l9_215.y))+((l9_274*l9_212.tangent)*l9_215.z))+((l9_278*l9_212.tangent)*l9_215.w);
}
l9_162=l9_212;
float l9_279=(*sc_set0.UserUniforms).voxelization_params_0.y;
float l9_280=(*sc_set0.UserUniforms).voxelization_params_0.z;
float l9_281=(*sc_set0.UserUniforms).voxelization_params_0.w;
float l9_282=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_283=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_284=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_285=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_286=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_287=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float3 l9_288=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float l9_289=l9_279/l9_280;
int l9_290=gl_InstanceIndex;
int l9_291=l9_290;
l9_162.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_162.position;
float3 l9_292=l9_162.position.xyz;
float3 l9_293=float3(float(l9_291%int(l9_281))*l9_279,float(l9_291/int(l9_281))*l9_279,(float(l9_291)*l9_289)+l9_286);
float3 l9_294=l9_292+l9_293;
float4 l9_295=float4(l9_294-l9_288,1.0);
float l9_296=l9_282;
float l9_297=l9_283;
float l9_298=l9_284;
float l9_299=l9_285;
float l9_300=l9_286;
float l9_301=l9_287;
float4x4 l9_302=float4x4(float4(2.0/(l9_297-l9_296),0.0,0.0,(-(l9_297+l9_296))/(l9_297-l9_296)),float4(0.0,2.0/(l9_299-l9_298),0.0,(-(l9_299+l9_298))/(l9_299-l9_298)),float4(0.0,0.0,(-2.0)/(l9_301-l9_300),(-(l9_301+l9_300))/(l9_301-l9_300)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_303=l9_302;
float4 l9_304=l9_303*l9_295;
l9_304.w=1.0;
out.varScreenPos=l9_304;
float4 l9_305=l9_304*1.0;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_305.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_306=l9_305;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_307=dot(l9_306,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_308=l9_307;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_308;
}
}
float4 l9_309=float4(l9_305.x,-l9_305.y,(l9_305.z*0.5)+(l9_305.w*0.5),l9_305.w);
out.gl_Position=l9_309;
param_2=l9_162;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
sc_Vertex_t l9_310=param_2;
sc_Vertex_t l9_311=l9_310;
if ((int(sc_VertexBlending_tmp)!=0))
{
if ((int(sc_VertexBlendingUseNormals_tmp)!=0))
{
sc_Vertex_t l9_312=l9_311;
float3 l9_313=in.blendShape0Pos;
float3 l9_314=in.blendShape0Normal;
float l9_315=(*sc_set0.UserUniforms).weights0.x;
sc_Vertex_t l9_316=l9_312;
float3 l9_317=l9_313;
float l9_318=l9_315;
float3 l9_319=l9_316.position.xyz+(l9_317*l9_318);
l9_316.position=float4(l9_319.x,l9_319.y,l9_319.z,l9_316.position.w);
l9_312=l9_316;
l9_312.normal+=(l9_314*l9_315);
l9_311=l9_312;
sc_Vertex_t l9_320=l9_311;
float3 l9_321=in.blendShape1Pos;
float3 l9_322=in.blendShape1Normal;
float l9_323=(*sc_set0.UserUniforms).weights0.y;
sc_Vertex_t l9_324=l9_320;
float3 l9_325=l9_321;
float l9_326=l9_323;
float3 l9_327=l9_324.position.xyz+(l9_325*l9_326);
l9_324.position=float4(l9_327.x,l9_327.y,l9_327.z,l9_324.position.w);
l9_320=l9_324;
l9_320.normal+=(l9_322*l9_323);
l9_311=l9_320;
sc_Vertex_t l9_328=l9_311;
float3 l9_329=in.blendShape2Pos;
float3 l9_330=in.blendShape2Normal;
float l9_331=(*sc_set0.UserUniforms).weights0.z;
sc_Vertex_t l9_332=l9_328;
float3 l9_333=l9_329;
float l9_334=l9_331;
float3 l9_335=l9_332.position.xyz+(l9_333*l9_334);
l9_332.position=float4(l9_335.x,l9_335.y,l9_335.z,l9_332.position.w);
l9_328=l9_332;
l9_328.normal+=(l9_330*l9_331);
l9_311=l9_328;
}
else
{
sc_Vertex_t l9_336=l9_311;
float3 l9_337=in.blendShape0Pos;
float l9_338=(*sc_set0.UserUniforms).weights0.x;
float3 l9_339=l9_336.position.xyz+(l9_337*l9_338);
l9_336.position=float4(l9_339.x,l9_339.y,l9_339.z,l9_336.position.w);
l9_311=l9_336;
sc_Vertex_t l9_340=l9_311;
float3 l9_341=in.blendShape1Pos;
float l9_342=(*sc_set0.UserUniforms).weights0.y;
float3 l9_343=l9_340.position.xyz+(l9_341*l9_342);
l9_340.position=float4(l9_343.x,l9_343.y,l9_343.z,l9_340.position.w);
l9_311=l9_340;
sc_Vertex_t l9_344=l9_311;
float3 l9_345=in.blendShape2Pos;
float l9_346=(*sc_set0.UserUniforms).weights0.z;
float3 l9_347=l9_344.position.xyz+(l9_345*l9_346);
l9_344.position=float4(l9_347.x,l9_347.y,l9_347.z,l9_344.position.w);
l9_311=l9_344;
sc_Vertex_t l9_348=l9_311;
float3 l9_349=in.blendShape3Pos;
float l9_350=(*sc_set0.UserUniforms).weights0.w;
float3 l9_351=l9_348.position.xyz+(l9_349*l9_350);
l9_348.position=float4(l9_351.x,l9_351.y,l9_351.z,l9_348.position.w);
l9_311=l9_348;
sc_Vertex_t l9_352=l9_311;
float3 l9_353=in.blendShape4Pos;
float l9_354=(*sc_set0.UserUniforms).weights1.x;
float3 l9_355=l9_352.position.xyz+(l9_353*l9_354);
l9_352.position=float4(l9_355.x,l9_355.y,l9_355.z,l9_352.position.w);
l9_311=l9_352;
sc_Vertex_t l9_356=l9_311;
float3 l9_357=in.blendShape5Pos;
float l9_358=(*sc_set0.UserUniforms).weights1.y;
float3 l9_359=l9_356.position.xyz+(l9_357*l9_358);
l9_356.position=float4(l9_359.x,l9_359.y,l9_359.z,l9_356.position.w);
l9_311=l9_356;
}
}
l9_310=l9_311;
sc_Vertex_t l9_360=l9_310;
if (sc_SkinBonesCount_tmp>0)
{
float4 l9_361=float4(0.0);
if (sc_SkinBonesCount_tmp>0)
{
l9_361=float4(1.0,fract(in.boneData.yzw));
l9_361.x-=dot(l9_361.yzw,float3(1.0));
}
float4 l9_362=l9_361;
float4 l9_363=l9_362;
int l9_364=int(in.boneData.x);
int l9_365=int(in.boneData.y);
int l9_366=int(in.boneData.z);
int l9_367=int(in.boneData.w);
int l9_368=l9_364;
float4 l9_369=l9_360.position;
float3 l9_370=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_371=l9_368;
float4 l9_372=(*sc_set0.sc_BonesUBO).sc_Bones[l9_371].boneMatrix[0];
float4 l9_373=(*sc_set0.sc_BonesUBO).sc_Bones[l9_371].boneMatrix[1];
float4 l9_374=(*sc_set0.sc_BonesUBO).sc_Bones[l9_371].boneMatrix[2];
float4 l9_375[3];
l9_375[0]=l9_372;
l9_375[1]=l9_373;
l9_375[2]=l9_374;
l9_370=float3(dot(l9_369,l9_375[0]),dot(l9_369,l9_375[1]),dot(l9_369,l9_375[2]));
}
else
{
l9_370=l9_369.xyz;
}
float3 l9_376=l9_370;
float3 l9_377=l9_376;
float l9_378=l9_363.x;
int l9_379=l9_365;
float4 l9_380=l9_360.position;
float3 l9_381=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_382=l9_379;
float4 l9_383=(*sc_set0.sc_BonesUBO).sc_Bones[l9_382].boneMatrix[0];
float4 l9_384=(*sc_set0.sc_BonesUBO).sc_Bones[l9_382].boneMatrix[1];
float4 l9_385=(*sc_set0.sc_BonesUBO).sc_Bones[l9_382].boneMatrix[2];
float4 l9_386[3];
l9_386[0]=l9_383;
l9_386[1]=l9_384;
l9_386[2]=l9_385;
l9_381=float3(dot(l9_380,l9_386[0]),dot(l9_380,l9_386[1]),dot(l9_380,l9_386[2]));
}
else
{
l9_381=l9_380.xyz;
}
float3 l9_387=l9_381;
float3 l9_388=l9_387;
float l9_389=l9_363.y;
int l9_390=l9_366;
float4 l9_391=l9_360.position;
float3 l9_392=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_393=l9_390;
float4 l9_394=(*sc_set0.sc_BonesUBO).sc_Bones[l9_393].boneMatrix[0];
float4 l9_395=(*sc_set0.sc_BonesUBO).sc_Bones[l9_393].boneMatrix[1];
float4 l9_396=(*sc_set0.sc_BonesUBO).sc_Bones[l9_393].boneMatrix[2];
float4 l9_397[3];
l9_397[0]=l9_394;
l9_397[1]=l9_395;
l9_397[2]=l9_396;
l9_392=float3(dot(l9_391,l9_397[0]),dot(l9_391,l9_397[1]),dot(l9_391,l9_397[2]));
}
else
{
l9_392=l9_391.xyz;
}
float3 l9_398=l9_392;
float3 l9_399=l9_398;
float l9_400=l9_363.z;
int l9_401=l9_367;
float4 l9_402=l9_360.position;
float3 l9_403=float3(0.0);
if (sc_SkinBonesCount_tmp>0)
{
int l9_404=l9_401;
float4 l9_405=(*sc_set0.sc_BonesUBO).sc_Bones[l9_404].boneMatrix[0];
float4 l9_406=(*sc_set0.sc_BonesUBO).sc_Bones[l9_404].boneMatrix[1];
float4 l9_407=(*sc_set0.sc_BonesUBO).sc_Bones[l9_404].boneMatrix[2];
float4 l9_408[3];
l9_408[0]=l9_405;
l9_408[1]=l9_406;
l9_408[2]=l9_407;
l9_403=float3(dot(l9_402,l9_408[0]),dot(l9_402,l9_408[1]),dot(l9_402,l9_408[2]));
}
else
{
l9_403=l9_402.xyz;
}
float3 l9_409=l9_403;
float3 l9_410=(((l9_377*l9_378)+(l9_388*l9_389))+(l9_399*l9_400))+(l9_409*l9_363.w);
l9_360.position=float4(l9_410.x,l9_410.y,l9_410.z,l9_360.position.w);
int l9_411=l9_364;
float3x3 l9_412=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_411].normalMatrix[2].xyz));
float3x3 l9_413=l9_412;
float3x3 l9_414=l9_413;
int l9_415=l9_365;
float3x3 l9_416=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_415].normalMatrix[2].xyz));
float3x3 l9_417=l9_416;
float3x3 l9_418=l9_417;
int l9_419=l9_366;
float3x3 l9_420=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_419].normalMatrix[2].xyz));
float3x3 l9_421=l9_420;
float3x3 l9_422=l9_421;
int l9_423=l9_367;
float3x3 l9_424=float3x3(float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_423].normalMatrix[0].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_423].normalMatrix[1].xyz),float3((*sc_set0.sc_BonesUBO).sc_Bones[l9_423].normalMatrix[2].xyz));
float3x3 l9_425=l9_424;
float3x3 l9_426=l9_425;
l9_360.normal=((((l9_414*l9_360.normal)*l9_363.x)+((l9_418*l9_360.normal)*l9_363.y))+((l9_422*l9_360.normal)*l9_363.z))+((l9_426*l9_360.normal)*l9_363.w);
l9_360.tangent=((((l9_414*l9_360.tangent)*l9_363.x)+((l9_418*l9_360.tangent)*l9_363.y))+((l9_422*l9_360.tangent)*l9_363.z))+((l9_426*l9_360.tangent)*l9_363.w);
}
l9_310=l9_360;
float3 l9_427=(*sc_set0.UserUniforms).voxelization_params_camera_pos;
float2 l9_428=((l9_310.position.xy/float2(l9_310.position.w))*0.5)+float2(0.5);
out.varTex01=float4(l9_428.x,l9_428.y,out.varTex01.z,out.varTex01.w);
l9_310.position=(*sc_set0.UserUniforms).sc_ModelMatrixVoxelization*l9_310.position;
float3 l9_429=l9_310.position.xyz-l9_427;
l9_310.position=float4(l9_429.x,l9_429.y,l9_429.z,l9_310.position.w);
out.varPosAndMotion=float4(l9_310.position.xyz.x,l9_310.position.xyz.y,l9_310.position.xyz.z,out.varPosAndMotion.w);
float3 l9_430=normalize(l9_310.normal);
out.varNormalAndMotion=float4(l9_430.x,l9_430.y,l9_430.z,out.varNormalAndMotion.w);
float l9_431=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.x;
float l9_432=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.y;
float l9_433=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.z;
float l9_434=(*sc_set0.UserUniforms).voxelization_params_frustum_lrbt.w;
float l9_435=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.x;
float l9_436=(*sc_set0.UserUniforms).voxelization_params_frustum_nf.y;
float l9_437=l9_431;
float l9_438=l9_432;
float l9_439=l9_433;
float l9_440=l9_434;
float l9_441=l9_435;
float l9_442=l9_436;
float4x4 l9_443=float4x4(float4(2.0/(l9_438-l9_437),0.0,0.0,(-(l9_438+l9_437))/(l9_438-l9_437)),float4(0.0,2.0/(l9_440-l9_439),0.0,(-(l9_440+l9_439))/(l9_440-l9_439)),float4(0.0,0.0,(-2.0)/(l9_442-l9_441),(-(l9_442+l9_441))/(l9_442-l9_441)),float4(0.0,0.0,0.0,1.0));
float4x4 l9_444=l9_443;
float4 l9_445=float4(0.0);
float3 l9_446=(l9_444*l9_310.position).xyz;
l9_445=float4(l9_446.x,l9_446.y,l9_446.z,l9_445.w);
l9_445.w=1.0;
out.varScreenPos=l9_445;
float4 l9_447=l9_445*1.0;
float4 l9_448=l9_447;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_448.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
if (sc_StereoRenderingMode_tmp>0)
{
out.varStereoViewID=gl_InstanceIndex%2;
}
float4 l9_449=l9_448;
if (sc_StereoRenderingMode_tmp==1)
{
float l9_450=dot(l9_449,(*sc_set0.UserUniforms).sc_StereoClipPlanes[gl_InstanceIndex%2]);
float l9_451=l9_450;
if (sc_StereoRendering_IsClipDistanceEnabled_tmp==1)
{
}
else
{
out.varClipDistance=l9_451;
}
}
float4 l9_452=float4(l9_448.x,-l9_448.y,(l9_448.z*0.5)+(l9_448.w*0.5),l9_448.w);
out.gl_Position=l9_452;
param_2=l9_310;
}
}
v=param_2;
float3 param_7=out.varPosAndMotion.xyz;
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
float4 l9_453=((*sc_set0.UserUniforms).sc_PrevFrameModelMatrix*(*sc_set0.UserUniforms).sc_ModelMatrixInverse)*float4(param_7,1.0);
float3 l9_454=param_7;
float3 l9_455=l9_453.xyz;
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
int l9_456=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_456=0;
}
else
{
l9_456=gl_InstanceIndex%2;
}
int l9_457=l9_456;
float4 l9_458=(*sc_set0.UserUniforms).sc_ViewProjectionMatrixArray[l9_457]*float4(l9_454,1.0);
float2 l9_459=l9_458.xy/float2(l9_458.w);
l9_458=float4(l9_459.x,l9_459.y,l9_458.z,l9_458.w);
int l9_460=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_460=0;
}
else
{
l9_460=gl_InstanceIndex%2;
}
int l9_461=l9_460;
float4 l9_462=(*sc_set0.UserUniforms).sc_PrevFrameViewProjectionMatrixArray[l9_461]*float4(l9_455,1.0);
float2 l9_463=l9_462.xy/float2(l9_462.w);
l9_462=float4(l9_463.x,l9_463.y,l9_462.z,l9_462.w);
float2 l9_464=(l9_458.xy-l9_462.xy)*0.5;
out.varPosAndMotion.w=l9_464.x;
out.varNormalAndMotion.w=l9_464.y;
}
}
if (PreviewInfo.Saved)
{
out.PreviewVertexColor=float4(PreviewInfo.Color.xyz,1.0);
out.PreviewVertexSaved=1.0;
}
return out;
}
} // VERTEX SHADER


namespace SNAP_FS {
struct sc_RayTracingHitPayload
{
float3 viewDirWS;
float3 positionWS;
float3 normalWS;
float4 tangentWS;
float4 color;
float2 uv0;
float2 uv1;
float2 uv2;
float2 uv3;
uint2 id;
};
struct ssGlobals
{
float gTimeElapsed;
float gTimeDelta;
float gTimeElapsedShifted;
float2 Surface_UVCoord0;
};
struct sc_PointLight_t
{
int falloffEnabled;
float falloffEndDistance;
float negRcpFalloffEndDistance4;
float angleScale;
float angleOffset;
float3 direction;
float3 position;
float4 color;
};
struct sc_DirectionalLight_t
{
float3 direction;
float4 color;
};
struct sc_AmbientLight_t
{
float3 color;
float intensity;
};
struct sc_SphericalGaussianLight_t
{
float3 color;
float sharpness;
float3 axis;
};
struct sc_LightEstimationData_t
{
sc_SphericalGaussianLight_t sg[12];
float3 ambientLight;
};
struct sc_Camera_t
{
float3 position;
float aspect;
float2 clipPlanes;
};
struct userUniformsObj
{
sc_PointLight_t sc_PointLights[3];
sc_DirectionalLight_t sc_DirectionalLights[5];
sc_AmbientLight_t sc_AmbientLights[3];
sc_LightEstimationData_t sc_LightEstimationData;
float4 sc_EnvmapDiffuseSize;
float4 sc_EnvmapDiffuseDims;
float4 sc_EnvmapDiffuseView;
float4 sc_EnvmapSpecularSize;
float4 sc_EnvmapSpecularDims;
float4 sc_EnvmapSpecularView;
float3 sc_EnvmapRotation;
float sc_EnvmapExposure;
float3 sc_Sh[9];
float sc_ShIntensity;
float4 sc_Time;
float4 sc_UniformConstants;
float4 sc_GeometryInfo;
float4x4 sc_ModelViewProjectionMatrixArray[2];
float4x4 sc_ModelViewProjectionMatrixInverseArray[2];
float4x4 sc_ViewProjectionMatrixArray[2];
float4x4 sc_ViewProjectionMatrixInverseArray[2];
float4x4 sc_ModelViewMatrixArray[2];
float4x4 sc_ModelViewMatrixInverseArray[2];
float3x3 sc_ViewNormalMatrixArray[2];
float3x3 sc_ViewNormalMatrixInverseArray[2];
float4x4 sc_ProjectionMatrixArray[2];
float4x4 sc_ProjectionMatrixInverseArray[2];
float4x4 sc_ViewMatrixArray[2];
float4x4 sc_ViewMatrixInverseArray[2];
float4x4 sc_PrevFrameViewProjectionMatrixArray[2];
float4x4 sc_ModelMatrix;
float4x4 sc_ModelMatrixInverse;
float3x3 sc_NormalMatrix;
float3x3 sc_NormalMatrixInverse;
float4x4 sc_PrevFrameModelMatrix;
float4x4 sc_PrevFrameModelMatrixInverse;
float3 sc_LocalAabbMin;
float3 sc_LocalAabbMax;
float3 sc_WorldAabbMin;
float3 sc_WorldAabbMax;
float4 sc_WindowToViewportTransform;
float4 sc_CurrentRenderTargetDims;
sc_Camera_t sc_Camera;
float sc_ShadowDensity;
float4 sc_ShadowColor;
float4x4 sc_ProjectorMatrix;
float shaderComplexityValue;
float4 weights0;
float4 weights1;
float4 weights2;
float4 sc_StereoClipPlanes[2];
int sc_FallbackInstanceID;
float2 sc_TAAJitterOffset;
float strandWidth;
float strandTaper;
float4 sc_StrandDataMapTextureSize;
float clumpInstanceCount;
float clumpRadius;
float clumpTipScale;
float hairstyleInstanceCount;
float hairstyleNoise;
float4 sc_ScreenTextureSize;
float4 sc_ScreenTextureDims;
float4 sc_ScreenTextureView;
uint4 sc_RayTracingCasterConfiguration;
uint4 sc_RayTracingCasterOffsetPNTC;
uint4 sc_RayTracingCasterOffsetTexture;
uint4 sc_RayTracingCasterFormatPNTC;
uint4 sc_RayTracingCasterFormatTexture;
float4 sc_RayTracingRayDirectionSize;
float4 sc_RayTracingRayDirectionDims;
float4 sc_RayTracingRayDirectionView;
float4 voxelization_params_0;
float4 voxelization_params_frustum_lrbt;
float4 voxelization_params_frustum_nf;
float3 voxelization_params_camera_pos;
float4x4 sc_ModelMatrixVoxelization;
float correctedIntensity;
float4 intensityTextureSize;
float4 intensityTextureDims;
float4 intensityTextureView;
float3x3 intensityTextureTransform;
float4 intensityTextureUvMinMax;
float4 intensityTextureBorderColor;
float reflBlurWidth;
float reflBlurMinRough;
float reflBlurMaxRough;
int overrideTimeEnabled;
float overrideTimeElapsed[32];
float overrideTimeDelta;
int PreviewEnabled;
int PreviewNodeID;
float alphaTestThreshold;
int Active;
int Hover;
float4 shadowColor;
float shapeAlpha;
float shapeWidthX;
int xRightPin;
float strokeThickness;
int xLeftPin;
float xOffset;
float shapeHeightY;
int yUpPin;
int yDownPin;
float yOffset;
float shadowRotation;
float shadowDistance;
float shapeRotation;
float shadowBlur;
float shapeRoundness;
float strokeAlpha;
float shadowAlpha;
float4 shapeColor;
float4 shapeTextureSize;
float4 shapeTextureDims;
float4 shapeTextureView;
float3x3 shapeTextureTransform;
float4 shapeTextureUvMinMax;
float4 shapeTextureBorderColor;
float2 shapeScale;
float2 shapeOffset;
float4 shapeGradColorA;
float4 shapeGradColorB;
float2 shapeScaleGrad;
float2 shapeGradPointA;
float2 shapeGradPointB;
float2 shapeQuadOffset;
float4 shapeGradColorC;
float4 shapeGradColorD;
float4 strokeColor;
float4 strokeTextureSize;
float4 strokeTextureDims;
float4 strokeTextureView;
float3x3 strokeTextureTransform;
float4 strokeTextureUvMinMax;
float4 strokeTextureBorderColor;
float2 strokeScale;
float2 strokeOffset;
float4 shapeGradColorA2;
float4 shapeGradColorB2;
float2 shapeScaleGrad2;
float2 shapeGradPointA2;
float2 shapeGradPointB2;
float2 shapeQuadOffset2;
float4 shapeGradColorC2;
float4 shapeGradColorD2;
float4 baseTexSize;
float4 baseTexDims;
float4 baseTexView;
float3x3 baseTexTransform;
float4 baseTexUvMinMax;
float4 baseTexBorderColor;
float Port_RangeMinA_N136;
float Port_RangeMaxA_N136;
float Port_RangeMinB_N136;
float Port_RangeMaxB_N136;
float4 Port_Default_N126;
float4 Port_Value0_N154;
float Port_Value1_N157;
float4 Port_Default_N154;
float2 Port_Input2_N148;
float Port_Import_N311;
float Port_RangeMinA_N268;
float Port_RangeMaxA_N268;
float Port_Import_N316;
float Port_Value0_N287;
float Port_Import_N314;
float Port_Value_N288;
float Port_Import_N312;
float Port_RangeMinA_N276;
float Port_RangeMaxA_N276;
float Port_RangeMinB_N276;
float Port_RangeMaxB_N276;
float Port_Default_N294;
float Port_Default_N287;
float Port_Import_N313;
float Port_Value0_N281;
float Port_RangeMinA_N295;
float Port_RangeMaxA_N295;
float Port_RangeMinB_N295;
float Port_RangeMaxB_N295;
float Port_Default_N296;
float Port_Default_N281;
float Port_Import_N317;
float Port_Value0_N282;
float Port_Value1_N282;
float Port_Default_N282;
float Port_Value0_N308;
float Port_Value0_N304;
float Port_RangeMinA_N303;
float Port_RangeMaxA_N303;
float Port_RangeMinB_N303;
float Port_RangeMaxB_N303;
float Port_Default_N304;
float Port_Default_N308;
float Port_Import_N318;
float Port_RangeMinA_N277;
float Port_RangeMaxA_N277;
float Port_Import_N320;
float Port_Value0_N289;
float Port_RangeMinA_N299;
float Port_RangeMaxA_N299;
float Port_RangeMinB_N299;
float Port_RangeMaxB_N299;
float Port_Default_N297;
float Port_Default_N289;
float Port_Import_N319;
float Port_Value0_N286;
float Port_RangeMinA_N300;
float Port_RangeMaxA_N300;
float Port_RangeMinB_N300;
float Port_RangeMaxB_N300;
float Port_Default_N298;
float Port_Default_N286;
float Port_Import_N315;
float Port_Value0_N293;
float Port_Value1_N293;
float Port_Default_N293;
float Port_Value0_N301;
float Port_Value0_N306;
float Port_RangeMinA_N305;
float Port_RangeMaxA_N305;
float Port_RangeMinB_N305;
float Port_RangeMaxB_N305;
float Port_Default_N306;
float Port_Default_N301;
float Port_Value0_N132;
float Port_Input1_N141;
float Port_Default_N132;
float2 Port_Center_N092;
float Port_Value1_N097;
float Port_Value0_N131;
float Port_Default_N131;
float Port_Input1_N160;
float Port_Input1_N263;
float2 Port_Center_N094;
float2 Port_Center_N100;
float Port_Value0_N125;
float Port_Default_N125;
float Port_RangeMinA_N138;
float Port_RangeMaxA_N138;
float Port_RangeMinB_N138;
float Port_RangeMaxB_N138;
float2 Port_Center_N137;
float Port_Input1_N019;
float Port_Input1_N020;
float Port_RangeMinA_N021;
float Port_RangeMaxA_N021;
float Port_RangeMinB_N021;
float Port_Value0_N122;
float Port_Default_N122;
float Port_Input1_N056;
float Port_RangeMinA_N022;
float Port_RangeMaxA_N022;
float Port_RangeMinB_N022;
float Port_Input1_N030;
float2 Port_Input1_N032;
float Port_RangeMinA_N135;
float Port_RangeMaxA_N135;
float Port_Input1_N127;
float Port_RangeMaxB_N135;
float Port_Input1_N038;
float Port_Input2_N038;
float Port_Input1_N264;
float Port_Input2_N264;
float Port_RangeMinA_N039;
float Port_RangeMaxA_N039;
float Port_RangeMaxB_N039;
float Port_RangeMinA_N042;
float Port_RangeMaxA_N042;
float Port_RangeMaxB_N042;
float Port_RangeMinA_N047;
float Port_RangeMaxA_N047;
float Port_RangeMinA_N101;
float Port_RangeMaxA_N101;
float Port_RangeMinB_N101;
float Port_RangeMinA_N057;
float Port_RangeMaxA_N057;
float Port_RangeMinB_N057;
float Port_RangeMaxB_N057;
float Port_RangeMaxB_N047;
float Port_Input1_N051;
float2 Port_Input1_N053;
float Port_RangeMinA_N133;
float Port_RangeMaxA_N133;
float Port_RangeMaxB_N133;
float Port_Input1_N064;
float Port_Input2_N064;
float Port_Input1_N066;
float Port_Input2_N066;
float Port_Value0_N068;
float Port_Default_N068;
float Port_Input1_N072;
float Port_Input2_N072;
float Port_Value0_N123;
float Port_Default_N123;
float Port_Input1_N259;
float2 Port_Center_N113;
float Port_Input1_N089;
float Port_Input1_N090;
float Port_Input1_N103;
float2 Port_Input1_N105;
float Port_Input1_N112;
float Port_Input2_N112;
float4 Port_Import_N158;
float4 Port_Import_N159;
float Port_Input0_N186;
float Port_Input1_N186;
float Port_RangeMinA_N175;
float Port_RangeMaxA_N175;
float Port_RangeMinB_N175;
float Port_RangeMaxB_N175;
float2 Port_Import_N176;
float2 Port_Center_N177;
float2 Port_Import_N178;
float2 Port_Import_N180;
float Port_Input1_N185;
float Port_Input2_N185;
float4 Port_Import_N195;
float4 Port_Import_N196;
float Port_RangeMinA_N198;
float Port_RangeMaxA_N198;
float Port_RangeMinB_N198;
float Port_RangeMaxB_N198;
float2 Port_Import_N199;
float2 Port_Import_N200;
float4 Port_Import_N204;
float4 Port_Import_N205;
float4 Port_Default_N209;
float4 Port_Default_N149;
float Port_Input1_N265;
float Port_Input2_N265;
float Port_Input1_N098;
float2 Port_Input1_N115;
float Port_Input1_N142;
float Port_Input2_N142;
float Port_Input1_N144;
float Port_Input2_N144;
float Port_RangeMinA_N171;
float Port_RangeMaxA_N171;
float4 Port_Value0_N325;
float4 Port_Import_N228;
float4 Port_Import_N229;
float Port_Input0_N242;
float Port_Input1_N242;
float Port_RangeMinA_N231;
float Port_RangeMaxA_N231;
float Port_RangeMinB_N231;
float Port_RangeMaxB_N231;
float2 Port_Import_N232;
float2 Port_Center_N233;
float2 Port_Import_N234;
float2 Port_Import_N236;
float Port_Input1_N241;
float Port_Input2_N241;
float4 Port_Import_N249;
float4 Port_Import_N250;
float Port_RangeMinA_N252;
float Port_RangeMaxA_N252;
float Port_RangeMinB_N252;
float Port_RangeMaxB_N252;
float2 Port_Import_N253;
float2 Port_Import_N254;
float4 Port_Import_N258;
float4 Port_Import_N262;
float4 Port_Default_N323;
float4 Port_Default_N324;
float4 Port_Default_N325;
float Port_Input1_N335;
float4 Port_Input1_N345;
float4 Port_Import_N353;
float4 Port_Input_N339;
float2 Port_Scale_N340;
float2 Port_Center_N340;
float4 Port_Input_N006;
float4 Port_Import_N355;
float Port_Input1_N361;
float Port_Input2_N361;
float depthRef;
};
struct sc_RayTracingCasterVertexBuffer_obj
{
float sc_RayTracingCasterVertices[1];
};
struct sc_RayTracingCasterNonAnimatedVertexBuffer_obj
{
float sc_RayTracingCasterNonAnimatedVertices[1];
};
struct sc_RayTracingCasterIndexBuffer_obj
{
uint sc_RayTracingCasterTriangles[1];
};
struct ssPreviewInfo
{
float4 Color;
bool Saved;
};
struct sc_Bone_t
{
float4 boneMatrix[3];
float4 normalMatrix[3];
};
struct sc_Bones_obj
{
sc_Bone_t sc_Bones[1];
};
struct sc_Set0
{
const device sc_RayTracingCasterIndexBuffer_obj* sc_RayTracingCasterIndexBuffer [[id(0)]];
const device sc_RayTracingCasterVertexBuffer_obj* sc_RayTracingCasterVertexBuffer [[id(1)]];
const device sc_RayTracingCasterNonAnimatedVertexBuffer_obj* sc_RayTracingCasterNonAnimatedVertexBuffer [[id(2)]];
constant sc_Bones_obj* sc_BonesUBO [[id(3)]];
texture2d<float> baseTex [[id(4)]];
texture2d<float> intensityTexture [[id(5)]];
texture2d<uint> sc_RayTracingHitCasterIdAndBarycentric [[id(16)]];
texture2d<float> sc_RayTracingRayDirection [[id(17)]];
texture2d<float> sc_ScreenTexture [[id(19)]];
texture2d<float> shapeTexture [[id(22)]];
texture2d<float> strokeTexture [[id(23)]];
sampler baseTexSmpSC [[id(24)]];
sampler intensityTextureSmpSC [[id(25)]];
sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC [[id(29)]];
sampler sc_RayTracingRayDirectionSmpSC [[id(30)]];
sampler sc_ScreenTextureSmpSC [[id(32)]];
sampler shapeTextureSmpSC [[id(35)]];
sampler strokeTextureSmpSC [[id(36)]];
constant userUniformsObj* UserUniforms [[id(37)]];
};
struct main_frag_out
{
float4 sc_FragData0 [[color(0)]];
};
struct main_frag_in
{
float4 varPosAndMotion [[user(locn0)]];
float4 varNormalAndMotion [[user(locn1)]];
float4 varTangent [[user(locn2)]];
float4 varTex01 [[user(locn3)]];
float4 varScreenPos [[user(locn4)]];
float2 varScreenTexturePos [[user(locn5)]];
float varViewSpaceDepth [[user(locn6)]];
float2 varShadowTex [[user(locn7)]];
int varStereoViewID [[user(locn8)]];
float varClipDistance [[user(locn9)]];
float4 varColor [[user(locn10)]];
float4 PreviewVertexColor [[user(locn11)]];
float PreviewVertexSaved [[user(locn12)]];
};
// Implementation of the GLSL mod() function,which is slightly different than Metal fmod()
template<typename Tx,typename Ty>
Tx mod(Tx x,Ty y)
{
return x-y*floor(x/y);
}
// Implementation of the GLSL radians() function
template<typename T>
T radians(T d)
{
return d*T(0.01745329251);
}
sc_RayTracingHitPayload sc_RayTracingEvaluateHitPayload(thread const int2& screenPos,constant userUniformsObj& UserUniforms,const device sc_RayTracingCasterVertexBuffer_obj& sc_RayTracingCasterVertexBuffer,const device sc_RayTracingCasterNonAnimatedVertexBuffer_obj& sc_RayTracingCasterNonAnimatedVertexBuffer,const device sc_RayTracingCasterIndexBuffer_obj& sc_RayTracingCasterIndexBuffer,thread texture2d<uint> sc_RayTracingHitCasterIdAndBarycentric,thread sampler sc_RayTracingHitCasterIdAndBarycentricSmpSC,thread texture2d<float> sc_RayTracingRayDirection,thread sampler sc_RayTracingRayDirectionSmpSC)
{
uint4 idAndBarycentric=sc_RayTracingHitCasterIdAndBarycentric.read(uint2(screenPos),0);
sc_RayTracingHitPayload rhp;
rhp.id=idAndBarycentric.xy;
if (rhp.id.x!=(UserUniforms.sc_RayTracingCasterConfiguration.y&65535u))
{
return rhp;
}
float2 brcVW=float2(as_type<half2>(idAndBarycentric.z|(idAndBarycentric.w<<uint(16))));
float3 brc=float3((1.0-brcVW.x)-brcVW.y,brcVW);
float2 param=sc_RayTracingRayDirection.read(uint2(screenPos),0).xy;
float3 l9_0=float3(param.x,param.y,(1.0-abs(param.x))-abs(param.y));
float l9_1=fast::clamp(-l9_0.z,0.0,1.0);
float l9_2;
if (l9_0.x>=0.0)
{
l9_2=-l9_1;
}
else
{
l9_2=l9_1;
}
float l9_3=l9_2;
float l9_4;
if (l9_0.y>=0.0)
{
l9_4=-l9_1;
}
else
{
l9_4=l9_1;
}
float2 l9_5=l9_0.xy+float2(l9_3,l9_4);
l9_0=float3(l9_5.x,l9_5.y,l9_0.z);
float3 l9_6=normalize(l9_0);
float3 rayDir=l9_6;
rhp.viewDirWS=-rayDir;
uint param_1=rhp.id.y;
uint l9_7=min(param_1,UserUniforms.sc_RayTracingCasterConfiguration.z);
uint l9_8=l9_7*6u;
uint l9_9=l9_8&4294967292u;
uint4 l9_10=(uint4(uint2(sc_RayTracingCasterIndexBuffer.sc_RayTracingCasterTriangles[l9_9/4u]),uint2(sc_RayTracingCasterIndexBuffer.sc_RayTracingCasterTriangles[(l9_9/4u)+1u]))&uint4(65535u,4294967295u,65535u,4294967295u))>>uint4(0u,16u,0u,16u);
uint3 l9_11;
if (l9_8==l9_9)
{
l9_11=l9_10.xyz;
}
else
{
l9_11=l9_10.yzw;
}
uint3 l9_12=l9_11;
uint3 i=l9_12;
if (UserUniforms.sc_RayTracingCasterConfiguration.x==2u)
{
float3 param_2=brc;
uint3 param_3=i;
uint param_4=0u;
uint3 l9_13=uint3((param_3*uint3(6u))+uint3(param_4));
uint l9_14=l9_13.x;
float3 l9_15=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_14],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_14+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_14+2u]);
uint l9_16=l9_13.y;
float3 l9_17=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_16],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_16+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_16+2u]);
uint l9_18=l9_13.z;
float3 l9_19=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_18],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_18+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_18+2u]);
float3 l9_20=((l9_15*param_2.x)+(l9_17*param_2.y))+(l9_19*param_2.z);
rhp.positionWS=l9_20;
}
else
{
float3 param_5=brc;
uint3 param_6=i;
uint3 l9_21=uint3((param_6.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.x,(param_6.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.x,(param_6.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.x);
float3 l9_22=float3(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.x==5u)
{
uint l9_23=l9_21.x;
float3 l9_24=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_23],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_23+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_23+2u]);
uint l9_25=l9_21.y;
float3 l9_26=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_25],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_25+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_25+2u]);
uint l9_27=l9_21.z;
float3 l9_28=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_27],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_27+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_27+2u]);
l9_22=((l9_24*param_5.x)+(l9_26*param_5.y))+(l9_28*param_5.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.x==6u)
{
uint l9_29=l9_21.x;
float3 l9_30=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_29]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_29+1u]))).x);
uint l9_31=l9_21.y;
float3 l9_32=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_31]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_31+1u]))).x);
uint l9_33=l9_21.z;
float3 l9_34=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_33]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_33+1u]))).x);
l9_22=((l9_30*param_5.x)+(l9_32*param_5.y))+(l9_34*param_5.z);
}
else
{
l9_22=float3(1.0,0.0,0.0);
}
}
float3 l9_35=l9_22;
float3 positionOS=l9_35;
rhp.positionWS=(UserUniforms.sc_ModelMatrix*float4(positionOS,1.0)).xyz;
}
if (UserUniforms.sc_RayTracingCasterOffsetPNTC.y>0u)
{
if (UserUniforms.sc_RayTracingCasterConfiguration.x==2u)
{
float3 param_7=brc;
uint3 param_8=i;
uint param_9=3u;
uint3 l9_36=uint3((param_8*uint3(6u))+uint3(param_9));
uint l9_37=l9_36.x;
float3 l9_38=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_37],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_37+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_37+2u]);
uint l9_39=l9_36.y;
float3 l9_40=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_39],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_39+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_39+2u]);
uint l9_41=l9_36.z;
float3 l9_42=float3(sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_41],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_41+1u],sc_RayTracingCasterNonAnimatedVertexBuffer.sc_RayTracingCasterNonAnimatedVertices[l9_41+2u]);
float3 l9_43=((l9_38*param_7.x)+(l9_40*param_7.y))+(l9_42*param_7.z);
rhp.normalWS=l9_43;
}
else
{
float3 param_10=brc;
uint3 param_11=i;
uint3 l9_44=uint3((param_11.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.y,(param_11.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.y,(param_11.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.y);
float3 l9_45=float3(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.y==5u)
{
uint l9_46=l9_44.x;
float3 l9_47=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_46],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_46+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_46+2u]);
uint l9_48=l9_44.y;
float3 l9_49=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_48],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_48+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_48+2u]);
uint l9_50=l9_44.z;
float3 l9_51=float3(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_50],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_50+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_50+2u]);
l9_45=((l9_47*param_10.x)+(l9_49*param_10.y))+(l9_51*param_10.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.y==6u)
{
uint l9_52=l9_44.x;
float3 l9_53=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_52]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_52+1u]))).x);
uint l9_54=l9_44.y;
float3 l9_55=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_54]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_54+1u]))).x);
uint l9_56=l9_44.z;
float3 l9_57=float3(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_56]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_56+1u]))).x);
l9_45=((l9_53*param_10.x)+(l9_55*param_10.y))+(l9_57*param_10.z);
}
else
{
l9_45=float3(1.0,0.0,0.0);
}
}
float3 l9_58=l9_45;
float3 normalOS=l9_58;
rhp.normalWS=normalize(UserUniforms.sc_NormalMatrix*normalOS);
}
}
else
{
rhp.normalWS=float3(1.0,0.0,0.0);
}
bool l9_59=!(UserUniforms.sc_RayTracingCasterConfiguration.x==2u);
bool l9_60;
if (l9_59)
{
l9_60=UserUniforms.sc_RayTracingCasterOffsetPNTC.z>0u;
}
else
{
l9_60=l9_59;
}
if (l9_60)
{
float3 param_12=brc;
uint3 param_13=i;
uint3 l9_61=uint3((param_13.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.z,(param_13.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.z,(param_13.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.z);
float4 l9_62=float4(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.z==5u)
{
uint l9_63=l9_61.x;
float4 l9_64=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_63+3u]);
uint l9_65=l9_61.y;
float4 l9_66=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_65+3u]);
uint l9_67=l9_61.z;
float4 l9_68=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_67+3u]);
l9_62=((l9_64*param_12.x)+(l9_66*param_12.y))+(l9_68*param_12.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.z==6u)
{
uint l9_69=l9_61.x;
float4 l9_70=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_69]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_69+1u]))));
uint l9_71=l9_61.y;
float4 l9_72=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_71]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_71+1u]))));
uint l9_73=l9_61.z;
float4 l9_74=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_73]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_73+1u]))));
l9_62=((l9_70*param_12.x)+(l9_72*param_12.y))+(l9_74*param_12.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.z==2u)
{
uint l9_75=l9_61.x;
uint l9_76=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_75]);
uint l9_77=l9_76&255u;
uint l9_78=(l9_76>>uint(8))&255u;
uint l9_79=(l9_76>>uint(16))&255u;
uint l9_80=(l9_76>>uint(24))&255u;
float4 l9_81=float4(float(l9_77),float(l9_78),float(l9_79),float(l9_80))/float4(255.0);
uint l9_82=l9_61.y;
uint l9_83=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_82]);
uint l9_84=l9_83&255u;
uint l9_85=(l9_83>>uint(8))&255u;
uint l9_86=(l9_83>>uint(16))&255u;
uint l9_87=(l9_83>>uint(24))&255u;
float4 l9_88=float4(float(l9_84),float(l9_85),float(l9_86),float(l9_87))/float4(255.0);
uint l9_89=l9_61.z;
uint l9_90=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_89]);
uint l9_91=l9_90&255u;
uint l9_92=(l9_90>>uint(8))&255u;
uint l9_93=(l9_90>>uint(16))&255u;
uint l9_94=(l9_90>>uint(24))&255u;
float4 l9_95=float4(float(l9_91),float(l9_92),float(l9_93),float(l9_94))/float4(255.0);
l9_62=((l9_81*param_12.x)+(l9_88*param_12.y))+(l9_95*param_12.z);
}
else
{
l9_62=float4(1.0,0.0,0.0,0.0);
}
}
}
float4 l9_96=l9_62;
float4 tangentOS=l9_96;
float3 tangentWS=normalize(UserUniforms.sc_NormalMatrix*tangentOS.xyz);
rhp.tangentWS=float4(tangentWS,tangentOS.w);
}
else
{
rhp.tangentWS=float4(1.0,0.0,0.0,1.0);
}
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w>0u)
{
float3 param_14=brc;
uint3 param_15=i;
uint3 l9_97=uint3((param_15.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.w,(param_15.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.w,(param_15.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetPNTC.w);
float4 l9_98=float4(0.0);
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w==5u)
{
uint l9_99=l9_97.x;
float4 l9_100=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_99+3u]);
uint l9_101=l9_97.y;
float4 l9_102=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_101+3u]);
uint l9_103=l9_97.z;
float4 l9_104=float4(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103+1u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103+2u],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_103+3u]);
l9_98=((l9_100*param_14.x)+(l9_102*param_14.y))+(l9_104*param_14.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w==6u)
{
uint l9_105=l9_97.x;
float4 l9_106=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_105]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_105+1u]))));
uint l9_107=l9_97.y;
float4 l9_108=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_107]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_107+1u]))));
uint l9_109=l9_97.z;
float4 l9_110=float4(float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_109]))),float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_109+1u]))));
l9_98=((l9_106*param_14.x)+(l9_108*param_14.y))+(l9_110*param_14.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatPNTC.w==2u)
{
uint l9_111=l9_97.x;
uint l9_112=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_111]);
uint l9_113=l9_112&255u;
uint l9_114=(l9_112>>uint(8))&255u;
uint l9_115=(l9_112>>uint(16))&255u;
uint l9_116=(l9_112>>uint(24))&255u;
float4 l9_117=float4(float(l9_113),float(l9_114),float(l9_115),float(l9_116))/float4(255.0);
uint l9_118=l9_97.y;
uint l9_119=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_118]);
uint l9_120=l9_119&255u;
uint l9_121=(l9_119>>uint(8))&255u;
uint l9_122=(l9_119>>uint(16))&255u;
uint l9_123=(l9_119>>uint(24))&255u;
float4 l9_124=float4(float(l9_120),float(l9_121),float(l9_122),float(l9_123))/float4(255.0);
uint l9_125=l9_97.z;
uint l9_126=as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_125]);
uint l9_127=l9_126&255u;
uint l9_128=(l9_126>>uint(8))&255u;
uint l9_129=(l9_126>>uint(16))&255u;
uint l9_130=(l9_126>>uint(24))&255u;
float4 l9_131=float4(float(l9_127),float(l9_128),float(l9_129),float(l9_130))/float4(255.0);
l9_98=((l9_117*param_14.x)+(l9_124*param_14.y))+(l9_131*param_14.z);
}
else
{
l9_98=float4(1.0,0.0,0.0,0.0);
}
}
}
float4 l9_132=l9_98;
rhp.color=l9_132;
}
float2 dummyRedBlack=float2(dot(brc,float3(uint3(1u)-(i%uint3(2u)))),0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.x>0u)
{
float3 param_16=brc;
uint3 param_17=i;
uint3 l9_133=uint3((param_17.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.x,(param_17.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.x,(param_17.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.x);
float2 l9_134=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.x==5u)
{
uint l9_135=l9_133.x;
float2 l9_136=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_135],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_135+1u]);
uint l9_137=l9_133.y;
float2 l9_138=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_137],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_137+1u]);
uint l9_139=l9_133.z;
float2 l9_140=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_139],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_139+1u]);
l9_134=((l9_136*param_16.x)+(l9_138*param_16.y))+(l9_140*param_16.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.x==6u)
{
uint l9_141=l9_133.x;
float2 l9_142=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_141])));
uint l9_143=l9_133.y;
float2 l9_144=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_143])));
uint l9_145=l9_133.z;
float2 l9_146=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_145])));
l9_134=((l9_142*param_16.x)+(l9_144*param_16.y))+(l9_146*param_16.z);
}
else
{
l9_134=float2(1.0,0.0);
}
}
float2 l9_147=l9_134;
rhp.uv0=l9_147;
}
else
{
rhp.uv0=dummyRedBlack;
}
if (UserUniforms.sc_RayTracingCasterFormatTexture.y>0u)
{
float3 param_18=brc;
uint3 param_19=i;
uint3 l9_148=uint3((param_19.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.y,(param_19.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.y,(param_19.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.y);
float2 l9_149=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.y==5u)
{
uint l9_150=l9_148.x;
float2 l9_151=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_150],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_150+1u]);
uint l9_152=l9_148.y;
float2 l9_153=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_152],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_152+1u]);
uint l9_154=l9_148.z;
float2 l9_155=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_154],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_154+1u]);
l9_149=((l9_151*param_18.x)+(l9_153*param_18.y))+(l9_155*param_18.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.y==6u)
{
uint l9_156=l9_148.x;
float2 l9_157=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_156])));
uint l9_158=l9_148.y;
float2 l9_159=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_158])));
uint l9_160=l9_148.z;
float2 l9_161=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_160])));
l9_149=((l9_157*param_18.x)+(l9_159*param_18.y))+(l9_161*param_18.z);
}
else
{
l9_149=float2(1.0,0.0);
}
}
float2 l9_162=l9_149;
rhp.uv1=l9_162;
}
else
{
rhp.uv1=dummyRedBlack;
}
if (UserUniforms.sc_RayTracingCasterFormatTexture.z>0u)
{
float3 param_20=brc;
uint3 param_21=i;
uint3 l9_163=uint3((param_21.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.z,(param_21.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.z,(param_21.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.z);
float2 l9_164=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.z==5u)
{
uint l9_165=l9_163.x;
float2 l9_166=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_165],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_165+1u]);
uint l9_167=l9_163.y;
float2 l9_168=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_167],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_167+1u]);
uint l9_169=l9_163.z;
float2 l9_170=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_169],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_169+1u]);
l9_164=((l9_166*param_20.x)+(l9_168*param_20.y))+(l9_170*param_20.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.z==6u)
{
uint l9_171=l9_163.x;
float2 l9_172=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_171])));
uint l9_173=l9_163.y;
float2 l9_174=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_173])));
uint l9_175=l9_163.z;
float2 l9_176=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_175])));
l9_164=((l9_172*param_20.x)+(l9_174*param_20.y))+(l9_176*param_20.z);
}
else
{
l9_164=float2(1.0,0.0);
}
}
float2 l9_177=l9_164;
rhp.uv2=l9_177;
}
else
{
rhp.uv2=dummyRedBlack;
}
if (UserUniforms.sc_RayTracingCasterFormatTexture.w>0u)
{
float3 param_22=brc;
uint3 param_23=i;
uint3 l9_178=uint3((param_23.x*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.w,(param_23.y*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.w,(param_23.z*(UserUniforms.sc_RayTracingCasterConfiguration.y>>16u))+UserUniforms.sc_RayTracingCasterOffsetTexture.w);
float2 l9_179=float2(0.0);
if (UserUniforms.sc_RayTracingCasterFormatTexture.w==5u)
{
uint l9_180=l9_178.x;
float2 l9_181=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_180],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_180+1u]);
uint l9_182=l9_178.y;
float2 l9_183=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_182],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_182+1u]);
uint l9_184=l9_178.z;
float2 l9_185=float2(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_184],sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_184+1u]);
l9_179=((l9_181*param_22.x)+(l9_183*param_22.y))+(l9_185*param_22.z);
}
else
{
if (UserUniforms.sc_RayTracingCasterFormatTexture.w==6u)
{
uint l9_186=l9_178.x;
float2 l9_187=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_186])));
uint l9_188=l9_178.y;
float2 l9_189=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_188])));
uint l9_190=l9_178.z;
float2 l9_191=float2(as_type<half2>(as_type<uint>(sc_RayTracingCasterVertexBuffer.sc_RayTracingCasterVertices[l9_190])));
l9_179=((l9_187*param_22.x)+(l9_189*param_22.y))+(l9_191*param_22.z);
}
else
{
l9_179=float2(1.0,0.0);
}
}
float2 l9_192=l9_179;
rhp.uv3=l9_192;
}
else
{
rhp.uv3=dummyRedBlack;
}
return rhp;
}
float transformSingleColor(thread const float& original,thread const float& intMap,thread const float& target)
{
if (((int(BLEND_MODE_REALISTIC_tmp)!=0)||(int(BLEND_MODE_FORGRAY_tmp)!=0))||(int(BLEND_MODE_NOTBRIGHT_tmp)!=0))
{
return original/pow(1.0-target,intMap);
}
else
{
if ((int(BLEND_MODE_DIVISION_tmp)!=0))
{
return original/(1.0-target);
}
else
{
if ((int(BLEND_MODE_BRIGHT_tmp)!=0))
{
return original/pow(1.0-target,2.0-(2.0*original));
}
}
}
return 0.0;
}
float3 transformColor(thread const float& yValue,thread const float3& original,thread const float3& target,thread const float& weight,thread const float& intMap)
{
if ((int(BLEND_MODE_INTENSE_tmp)!=0))
{
float3 param=original;
float3 l9_0=param;
float4 l9_1;
if (l9_0.y<l9_0.z)
{
l9_1=float4(l9_0.zy,-1.0,0.66666669);
}
else
{
l9_1=float4(l9_0.yz,0.0,-0.33333334);
}
float4 l9_2=l9_1;
float4 l9_3;
if (l9_0.x<l9_2.x)
{
l9_3=float4(l9_2.xyw,l9_0.x);
}
else
{
l9_3=float4(l9_0.x,l9_2.yzx);
}
float4 l9_4=l9_3;
float l9_5=l9_4.x-fast::min(l9_4.w,l9_4.y);
float l9_6=abs(((l9_4.w-l9_4.y)/((6.0*l9_5)+1e-07))+l9_4.z);
float l9_7=l9_4.x;
float3 l9_8=float3(l9_6,l9_5,l9_7);
float3 l9_9=l9_8;
float l9_10=l9_9.z-(l9_9.y*0.5);
float l9_11=l9_9.y/((1.0-abs((2.0*l9_10)-1.0))+1e-07);
float3 l9_12=float3(l9_9.x,l9_11,l9_10);
float3 hslOrig=l9_12;
float3 res=float3(0.0);
res.x=target.x;
res.y=target.y;
res.z=hslOrig.z;
float3 param_1=res;
float l9_13=param_1.x;
float l9_14=abs((6.0*l9_13)-3.0)-1.0;
float l9_15=2.0-abs((6.0*l9_13)-2.0);
float l9_16=2.0-abs((6.0*l9_13)-4.0);
float3 l9_17=fast::clamp(float3(l9_14,l9_15,l9_16),float3(0.0),float3(1.0));
float3 l9_18=l9_17;
float l9_19=(1.0-abs((2.0*param_1.z)-1.0))*param_1.y;
l9_18=((l9_18-float3(0.5))*l9_19)+float3(param_1.z);
float3 l9_20=l9_18;
res=l9_20;
float3 resColor=mix(original,res,float3(weight));
return resColor;
}
else
{
float3 tmpColor=float3(0.0);
float param_2=yValue;
float param_3=intMap;
float param_4=target.x;
tmpColor.x=transformSingleColor(param_2,param_3,param_4);
float param_5=yValue;
float param_6=intMap;
float param_7=target.y;
tmpColor.y=transformSingleColor(param_5,param_6,param_7);
float param_8=yValue;
float param_9=intMap;
float param_10=target.z;
tmpColor.z=transformSingleColor(param_8,param_9,param_10);
tmpColor=fast::clamp(tmpColor,float3(0.0),float3(1.0));
float3 resColor_1=mix(original,tmpColor,float3(weight));
return resColor_1;
}
}
float3 definedBlend(thread const float3& a,thread const float3& b,thread int& varStereoViewID,constant userUniformsObj& UserUniforms,thread texture2d<float> intensityTexture,thread sampler intensityTextureSmpSC)
{
if ((int(BLEND_MODE_LIGHTEN_tmp)!=0))
{
return fast::max(a,b);
}
else
{
if ((int(BLEND_MODE_DARKEN_tmp)!=0))
{
return fast::min(a,b);
}
else
{
if ((int(BLEND_MODE_DIVIDE_tmp)!=0))
{
return b/a;
}
else
{
if ((int(BLEND_MODE_AVERAGE_tmp)!=0))
{
return (a+b)*0.5;
}
else
{
if ((int(BLEND_MODE_SUBTRACT_tmp)!=0))
{
return fast::max((a+b)-float3(1.0),float3(0.0));
}
else
{
if ((int(BLEND_MODE_DIFFERENCE_tmp)!=0))
{
return abs(a-b);
}
else
{
if ((int(BLEND_MODE_NEGATION_tmp)!=0))
{
return float3(1.0)-abs((float3(1.0)-a)-b);
}
else
{
if ((int(BLEND_MODE_EXCLUSION_tmp)!=0))
{
return (a+b)-((a*2.0)*b);
}
else
{
if ((int(BLEND_MODE_OVERLAY_tmp)!=0))
{
float l9_0;
if (a.x<0.5)
{
l9_0=(2.0*a.x)*b.x;
}
else
{
l9_0=1.0-((2.0*(1.0-a.x))*(1.0-b.x));
}
float l9_1=l9_0;
float l9_2;
if (a.y<0.5)
{
l9_2=(2.0*a.y)*b.y;
}
else
{
l9_2=1.0-((2.0*(1.0-a.y))*(1.0-b.y));
}
float l9_3=l9_2;
float l9_4;
if (a.z<0.5)
{
l9_4=(2.0*a.z)*b.z;
}
else
{
l9_4=1.0-((2.0*(1.0-a.z))*(1.0-b.z));
}
return float3(l9_1,l9_3,l9_4);
}
else
{
if ((int(BLEND_MODE_SOFT_LIGHT_tmp)!=0))
{
return (((float3(1.0)-(b*2.0))*a)*a)+((a*2.0)*b);
}
else
{
if ((int(BLEND_MODE_HARD_LIGHT_tmp)!=0))
{
float l9_5;
if (b.x<0.5)
{
l9_5=(2.0*b.x)*a.x;
}
else
{
l9_5=1.0-((2.0*(1.0-b.x))*(1.0-a.x));
}
float l9_6=l9_5;
float l9_7;
if (b.y<0.5)
{
l9_7=(2.0*b.y)*a.y;
}
else
{
l9_7=1.0-((2.0*(1.0-b.y))*(1.0-a.y));
}
float l9_8=l9_7;
float l9_9;
if (b.z<0.5)
{
l9_9=(2.0*b.z)*a.z;
}
else
{
l9_9=1.0-((2.0*(1.0-b.z))*(1.0-a.z));
}
return float3(l9_6,l9_8,l9_9);
}
else
{
if ((int(BLEND_MODE_COLOR_DODGE_tmp)!=0))
{
float l9_10;
if (b.x==1.0)
{
l9_10=b.x;
}
else
{
l9_10=fast::min(a.x/(1.0-b.x),1.0);
}
float l9_11=l9_10;
float l9_12;
if (b.y==1.0)
{
l9_12=b.y;
}
else
{
l9_12=fast::min(a.y/(1.0-b.y),1.0);
}
float l9_13=l9_12;
float l9_14;
if (b.z==1.0)
{
l9_14=b.z;
}
else
{
l9_14=fast::min(a.z/(1.0-b.z),1.0);
}
return float3(l9_11,l9_13,l9_14);
}
else
{
if ((int(BLEND_MODE_COLOR_BURN_tmp)!=0))
{
float l9_15;
if (b.x==0.0)
{
l9_15=b.x;
}
else
{
l9_15=fast::max(1.0-((1.0-a.x)/b.x),0.0);
}
float l9_16=l9_15;
float l9_17;
if (b.y==0.0)
{
l9_17=b.y;
}
else
{
l9_17=fast::max(1.0-((1.0-a.y)/b.y),0.0);
}
float l9_18=l9_17;
float l9_19;
if (b.z==0.0)
{
l9_19=b.z;
}
else
{
l9_19=fast::max(1.0-((1.0-a.z)/b.z),0.0);
}
return float3(l9_16,l9_18,l9_19);
}
else
{
if ((int(BLEND_MODE_LINEAR_LIGHT_tmp)!=0))
{
float l9_20;
if (b.x<0.5)
{
l9_20=fast::max((a.x+(2.0*b.x))-1.0,0.0);
}
else
{
l9_20=fast::min(a.x+(2.0*(b.x-0.5)),1.0);
}
float l9_21=l9_20;
float l9_22;
if (b.y<0.5)
{
l9_22=fast::max((a.y+(2.0*b.y))-1.0,0.0);
}
else
{
l9_22=fast::min(a.y+(2.0*(b.y-0.5)),1.0);
}
float l9_23=l9_22;
float l9_24;
if (b.z<0.5)
{
l9_24=fast::max((a.z+(2.0*b.z))-1.0,0.0);
}
else
{
l9_24=fast::min(a.z+(2.0*(b.z-0.5)),1.0);
}
return float3(l9_21,l9_23,l9_24);
}
else
{
if ((int(BLEND_MODE_VIVID_LIGHT_tmp)!=0))
{
float l9_25;
if (b.x<0.5)
{
float l9_26;
if ((2.0*b.x)==0.0)
{
l9_26=2.0*b.x;
}
else
{
l9_26=fast::max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_25=l9_26;
}
else
{
float l9_27;
if ((2.0*(b.x-0.5))==1.0)
{
l9_27=2.0*(b.x-0.5);
}
else
{
l9_27=fast::min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_25=l9_27;
}
float l9_28=l9_25;
float l9_29;
if (b.y<0.5)
{
float l9_30;
if ((2.0*b.y)==0.0)
{
l9_30=2.0*b.y;
}
else
{
l9_30=fast::max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_29=l9_30;
}
else
{
float l9_31;
if ((2.0*(b.y-0.5))==1.0)
{
l9_31=2.0*(b.y-0.5);
}
else
{
l9_31=fast::min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_29=l9_31;
}
float l9_32=l9_29;
float l9_33;
if (b.z<0.5)
{
float l9_34;
if ((2.0*b.z)==0.0)
{
l9_34=2.0*b.z;
}
else
{
l9_34=fast::max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_33=l9_34;
}
else
{
float l9_35;
if ((2.0*(b.z-0.5))==1.0)
{
l9_35=2.0*(b.z-0.5);
}
else
{
l9_35=fast::min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_33=l9_35;
}
return float3(l9_28,l9_32,l9_33);
}
else
{
if ((int(BLEND_MODE_PIN_LIGHT_tmp)!=0))
{
float l9_36;
if (b.x<0.5)
{
l9_36=fast::min(a.x,2.0*b.x);
}
else
{
l9_36=fast::max(a.x,2.0*(b.x-0.5));
}
float l9_37=l9_36;
float l9_38;
if (b.y<0.5)
{
l9_38=fast::min(a.y,2.0*b.y);
}
else
{
l9_38=fast::max(a.y,2.0*(b.y-0.5));
}
float l9_39=l9_38;
float l9_40;
if (b.z<0.5)
{
l9_40=fast::min(a.z,2.0*b.z);
}
else
{
l9_40=fast::max(a.z,2.0*(b.z-0.5));
}
return float3(l9_37,l9_39,l9_40);
}
else
{
if ((int(BLEND_MODE_HARD_MIX_tmp)!=0))
{
float l9_41;
if (b.x<0.5)
{
float l9_42;
if ((2.0*b.x)==0.0)
{
l9_42=2.0*b.x;
}
else
{
l9_42=fast::max(1.0-((1.0-a.x)/(2.0*b.x)),0.0);
}
l9_41=l9_42;
}
else
{
float l9_43;
if ((2.0*(b.x-0.5))==1.0)
{
l9_43=2.0*(b.x-0.5);
}
else
{
l9_43=fast::min(a.x/(1.0-(2.0*(b.x-0.5))),1.0);
}
l9_41=l9_43;
}
float l9_44=l9_41;
float l9_45;
if (b.y<0.5)
{
float l9_46;
if ((2.0*b.y)==0.0)
{
l9_46=2.0*b.y;
}
else
{
l9_46=fast::max(1.0-((1.0-a.y)/(2.0*b.y)),0.0);
}
l9_45=l9_46;
}
else
{
float l9_47;
if ((2.0*(b.y-0.5))==1.0)
{
l9_47=2.0*(b.y-0.5);
}
else
{
l9_47=fast::min(a.y/(1.0-(2.0*(b.y-0.5))),1.0);
}
l9_45=l9_47;
}
float l9_48=l9_45;
float l9_49;
if (b.z<0.5)
{
float l9_50;
if ((2.0*b.z)==0.0)
{
l9_50=2.0*b.z;
}
else
{
l9_50=fast::max(1.0-((1.0-a.z)/(2.0*b.z)),0.0);
}
l9_49=l9_50;
}
else
{
float l9_51;
if ((2.0*(b.z-0.5))==1.0)
{
l9_51=2.0*(b.z-0.5);
}
else
{
l9_51=fast::min(a.z/(1.0-(2.0*(b.z-0.5))),1.0);
}
l9_49=l9_51;
}
return float3((l9_44<0.5) ? 0.0 : 1.0,(l9_48<0.5) ? 0.0 : 1.0,(l9_49<0.5) ? 0.0 : 1.0);
}
else
{
if ((int(BLEND_MODE_HARD_REFLECT_tmp)!=0))
{
float l9_52;
if (b.x==1.0)
{
l9_52=b.x;
}
else
{
l9_52=fast::min((a.x*a.x)/(1.0-b.x),1.0);
}
float l9_53=l9_52;
float l9_54;
if (b.y==1.0)
{
l9_54=b.y;
}
else
{
l9_54=fast::min((a.y*a.y)/(1.0-b.y),1.0);
}
float l9_55=l9_54;
float l9_56;
if (b.z==1.0)
{
l9_56=b.z;
}
else
{
l9_56=fast::min((a.z*a.z)/(1.0-b.z),1.0);
}
return float3(l9_53,l9_55,l9_56);
}
else
{
if ((int(BLEND_MODE_HARD_GLOW_tmp)!=0))
{
float l9_57;
if (a.x==1.0)
{
l9_57=a.x;
}
else
{
l9_57=fast::min((b.x*b.x)/(1.0-a.x),1.0);
}
float l9_58=l9_57;
float l9_59;
if (a.y==1.0)
{
l9_59=a.y;
}
else
{
l9_59=fast::min((b.y*b.y)/(1.0-a.y),1.0);
}
float l9_60=l9_59;
float l9_61;
if (a.z==1.0)
{
l9_61=a.z;
}
else
{
l9_61=fast::min((b.z*b.z)/(1.0-a.z),1.0);
}
return float3(l9_58,l9_60,l9_61);
}
else
{
if ((int(BLEND_MODE_HARD_PHOENIX_tmp)!=0))
{
return (fast::min(a,b)-fast::max(a,b))+float3(1.0);
}
else
{
if ((int(BLEND_MODE_HUE_tmp)!=0))
{
float3 param=a;
float3 param_1=b;
float3 l9_62=param;
float3 l9_63=l9_62;
float4 l9_64;
if (l9_63.y<l9_63.z)
{
l9_64=float4(l9_63.zy,-1.0,0.66666669);
}
else
{
l9_64=float4(l9_63.yz,0.0,-0.33333334);
}
float4 l9_65=l9_64;
float4 l9_66;
if (l9_63.x<l9_65.x)
{
l9_66=float4(l9_65.xyw,l9_63.x);
}
else
{
l9_66=float4(l9_63.x,l9_65.yzx);
}
float4 l9_67=l9_66;
float l9_68=l9_67.x-fast::min(l9_67.w,l9_67.y);
float l9_69=abs(((l9_67.w-l9_67.y)/((6.0*l9_68)+1e-07))+l9_67.z);
float l9_70=l9_67.x;
float3 l9_71=float3(l9_69,l9_68,l9_70);
float3 l9_72=l9_71;
float l9_73=l9_72.z-(l9_72.y*0.5);
float l9_74=l9_72.y/((1.0-abs((2.0*l9_73)-1.0))+1e-07);
float3 l9_75=float3(l9_72.x,l9_74,l9_73);
float3 l9_76=l9_75;
float3 l9_77=param_1;
float3 l9_78=l9_77;
float4 l9_79;
if (l9_78.y<l9_78.z)
{
l9_79=float4(l9_78.zy,-1.0,0.66666669);
}
else
{
l9_79=float4(l9_78.yz,0.0,-0.33333334);
}
float4 l9_80=l9_79;
float4 l9_81;
if (l9_78.x<l9_80.x)
{
l9_81=float4(l9_80.xyw,l9_78.x);
}
else
{
l9_81=float4(l9_78.x,l9_80.yzx);
}
float4 l9_82=l9_81;
float l9_83=l9_82.x-fast::min(l9_82.w,l9_82.y);
float l9_84=abs(((l9_82.w-l9_82.y)/((6.0*l9_83)+1e-07))+l9_82.z);
float l9_85=l9_82.x;
float3 l9_86=float3(l9_84,l9_83,l9_85);
float3 l9_87=l9_86;
float l9_88=l9_87.z-(l9_87.y*0.5);
float l9_89=l9_87.y/((1.0-abs((2.0*l9_88)-1.0))+1e-07);
float3 l9_90=float3(l9_87.x,l9_89,l9_88);
float3 l9_91=float3(l9_90.x,l9_76.y,l9_76.z);
float l9_92=l9_91.x;
float l9_93=abs((6.0*l9_92)-3.0)-1.0;
float l9_94=2.0-abs((6.0*l9_92)-2.0);
float l9_95=2.0-abs((6.0*l9_92)-4.0);
float3 l9_96=fast::clamp(float3(l9_93,l9_94,l9_95),float3(0.0),float3(1.0));
float3 l9_97=l9_96;
float l9_98=(1.0-abs((2.0*l9_91.z)-1.0))*l9_91.y;
l9_97=((l9_97-float3(0.5))*l9_98)+float3(l9_91.z);
float3 l9_99=l9_97;
float3 l9_100=l9_99;
return l9_100;
}
else
{
if ((int(BLEND_MODE_SATURATION_tmp)!=0))
{
float3 param_2=a;
float3 param_3=b;
float3 l9_101=param_2;
float3 l9_102=l9_101;
float4 l9_103;
if (l9_102.y<l9_102.z)
{
l9_103=float4(l9_102.zy,-1.0,0.66666669);
}
else
{
l9_103=float4(l9_102.yz,0.0,-0.33333334);
}
float4 l9_104=l9_103;
float4 l9_105;
if (l9_102.x<l9_104.x)
{
l9_105=float4(l9_104.xyw,l9_102.x);
}
else
{
l9_105=float4(l9_102.x,l9_104.yzx);
}
float4 l9_106=l9_105;
float l9_107=l9_106.x-fast::min(l9_106.w,l9_106.y);
float l9_108=abs(((l9_106.w-l9_106.y)/((6.0*l9_107)+1e-07))+l9_106.z);
float l9_109=l9_106.x;
float3 l9_110=float3(l9_108,l9_107,l9_109);
float3 l9_111=l9_110;
float l9_112=l9_111.z-(l9_111.y*0.5);
float l9_113=l9_111.y/((1.0-abs((2.0*l9_112)-1.0))+1e-07);
float3 l9_114=float3(l9_111.x,l9_113,l9_112);
float3 l9_115=l9_114;
float l9_116=l9_115.x;
float3 l9_117=param_3;
float3 l9_118=l9_117;
float4 l9_119;
if (l9_118.y<l9_118.z)
{
l9_119=float4(l9_118.zy,-1.0,0.66666669);
}
else
{
l9_119=float4(l9_118.yz,0.0,-0.33333334);
}
float4 l9_120=l9_119;
float4 l9_121;
if (l9_118.x<l9_120.x)
{
l9_121=float4(l9_120.xyw,l9_118.x);
}
else
{
l9_121=float4(l9_118.x,l9_120.yzx);
}
float4 l9_122=l9_121;
float l9_123=l9_122.x-fast::min(l9_122.w,l9_122.y);
float l9_124=abs(((l9_122.w-l9_122.y)/((6.0*l9_123)+1e-07))+l9_122.z);
float l9_125=l9_122.x;
float3 l9_126=float3(l9_124,l9_123,l9_125);
float3 l9_127=l9_126;
float l9_128=l9_127.z-(l9_127.y*0.5);
float l9_129=l9_127.y/((1.0-abs((2.0*l9_128)-1.0))+1e-07);
float3 l9_130=float3(l9_127.x,l9_129,l9_128);
float3 l9_131=float3(l9_116,l9_130.y,l9_115.z);
float l9_132=l9_131.x;
float l9_133=abs((6.0*l9_132)-3.0)-1.0;
float l9_134=2.0-abs((6.0*l9_132)-2.0);
float l9_135=2.0-abs((6.0*l9_132)-4.0);
float3 l9_136=fast::clamp(float3(l9_133,l9_134,l9_135),float3(0.0),float3(1.0));
float3 l9_137=l9_136;
float l9_138=(1.0-abs((2.0*l9_131.z)-1.0))*l9_131.y;
l9_137=((l9_137-float3(0.5))*l9_138)+float3(l9_131.z);
float3 l9_139=l9_137;
float3 l9_140=l9_139;
return l9_140;
}
else
{
if ((int(BLEND_MODE_COLOR_tmp)!=0))
{
float3 param_4=a;
float3 param_5=b;
float3 l9_141=param_5;
float3 l9_142=l9_141;
float4 l9_143;
if (l9_142.y<l9_142.z)
{
l9_143=float4(l9_142.zy,-1.0,0.66666669);
}
else
{
l9_143=float4(l9_142.yz,0.0,-0.33333334);
}
float4 l9_144=l9_143;
float4 l9_145;
if (l9_142.x<l9_144.x)
{
l9_145=float4(l9_144.xyw,l9_142.x);
}
else
{
l9_145=float4(l9_142.x,l9_144.yzx);
}
float4 l9_146=l9_145;
float l9_147=l9_146.x-fast::min(l9_146.w,l9_146.y);
float l9_148=abs(((l9_146.w-l9_146.y)/((6.0*l9_147)+1e-07))+l9_146.z);
float l9_149=l9_146.x;
float3 l9_150=float3(l9_148,l9_147,l9_149);
float3 l9_151=l9_150;
float l9_152=l9_151.z-(l9_151.y*0.5);
float l9_153=l9_151.y/((1.0-abs((2.0*l9_152)-1.0))+1e-07);
float3 l9_154=float3(l9_151.x,l9_153,l9_152);
float3 l9_155=l9_154;
float l9_156=l9_155.x;
float l9_157=l9_155.y;
float3 l9_158=param_4;
float3 l9_159=l9_158;
float4 l9_160;
if (l9_159.y<l9_159.z)
{
l9_160=float4(l9_159.zy,-1.0,0.66666669);
}
else
{
l9_160=float4(l9_159.yz,0.0,-0.33333334);
}
float4 l9_161=l9_160;
float4 l9_162;
if (l9_159.x<l9_161.x)
{
l9_162=float4(l9_161.xyw,l9_159.x);
}
else
{
l9_162=float4(l9_159.x,l9_161.yzx);
}
float4 l9_163=l9_162;
float l9_164=l9_163.x-fast::min(l9_163.w,l9_163.y);
float l9_165=abs(((l9_163.w-l9_163.y)/((6.0*l9_164)+1e-07))+l9_163.z);
float l9_166=l9_163.x;
float3 l9_167=float3(l9_165,l9_164,l9_166);
float3 l9_168=l9_167;
float l9_169=l9_168.z-(l9_168.y*0.5);
float l9_170=l9_168.y/((1.0-abs((2.0*l9_169)-1.0))+1e-07);
float3 l9_171=float3(l9_168.x,l9_170,l9_169);
float3 l9_172=float3(l9_156,l9_157,l9_171.z);
float l9_173=l9_172.x;
float l9_174=abs((6.0*l9_173)-3.0)-1.0;
float l9_175=2.0-abs((6.0*l9_173)-2.0);
float l9_176=2.0-abs((6.0*l9_173)-4.0);
float3 l9_177=fast::clamp(float3(l9_174,l9_175,l9_176),float3(0.0),float3(1.0));
float3 l9_178=l9_177;
float l9_179=(1.0-abs((2.0*l9_172.z)-1.0))*l9_172.y;
l9_178=((l9_178-float3(0.5))*l9_179)+float3(l9_172.z);
float3 l9_180=l9_178;
float3 l9_181=l9_180;
return l9_181;
}
else
{
if ((int(BLEND_MODE_LUMINOSITY_tmp)!=0))
{
float3 param_6=a;
float3 param_7=b;
float3 l9_182=param_6;
float3 l9_183=l9_182;
float4 l9_184;
if (l9_183.y<l9_183.z)
{
l9_184=float4(l9_183.zy,-1.0,0.66666669);
}
else
{
l9_184=float4(l9_183.yz,0.0,-0.33333334);
}
float4 l9_185=l9_184;
float4 l9_186;
if (l9_183.x<l9_185.x)
{
l9_186=float4(l9_185.xyw,l9_183.x);
}
else
{
l9_186=float4(l9_183.x,l9_185.yzx);
}
float4 l9_187=l9_186;
float l9_188=l9_187.x-fast::min(l9_187.w,l9_187.y);
float l9_189=abs(((l9_187.w-l9_187.y)/((6.0*l9_188)+1e-07))+l9_187.z);
float l9_190=l9_187.x;
float3 l9_191=float3(l9_189,l9_188,l9_190);
float3 l9_192=l9_191;
float l9_193=l9_192.z-(l9_192.y*0.5);
float l9_194=l9_192.y/((1.0-abs((2.0*l9_193)-1.0))+1e-07);
float3 l9_195=float3(l9_192.x,l9_194,l9_193);
float3 l9_196=l9_195;
float l9_197=l9_196.x;
float l9_198=l9_196.y;
float3 l9_199=param_7;
float3 l9_200=l9_199;
float4 l9_201;
if (l9_200.y<l9_200.z)
{
l9_201=float4(l9_200.zy,-1.0,0.66666669);
}
else
{
l9_201=float4(l9_200.yz,0.0,-0.33333334);
}
float4 l9_202=l9_201;
float4 l9_203;
if (l9_200.x<l9_202.x)
{
l9_203=float4(l9_202.xyw,l9_200.x);
}
else
{
l9_203=float4(l9_200.x,l9_202.yzx);
}
float4 l9_204=l9_203;
float l9_205=l9_204.x-fast::min(l9_204.w,l9_204.y);
float l9_206=abs(((l9_204.w-l9_204.y)/((6.0*l9_205)+1e-07))+l9_204.z);
float l9_207=l9_204.x;
float3 l9_208=float3(l9_206,l9_205,l9_207);
float3 l9_209=l9_208;
float l9_210=l9_209.z-(l9_209.y*0.5);
float l9_211=l9_209.y/((1.0-abs((2.0*l9_210)-1.0))+1e-07);
float3 l9_212=float3(l9_209.x,l9_211,l9_210);
float3 l9_213=float3(l9_197,l9_198,l9_212.z);
float l9_214=l9_213.x;
float l9_215=abs((6.0*l9_214)-3.0)-1.0;
float l9_216=2.0-abs((6.0*l9_214)-2.0);
float l9_217=2.0-abs((6.0*l9_214)-4.0);
float3 l9_218=fast::clamp(float3(l9_215,l9_216,l9_217),float3(0.0),float3(1.0));
float3 l9_219=l9_218;
float l9_220=(1.0-abs((2.0*l9_213.z)-1.0))*l9_213.y;
l9_219=((l9_219-float3(0.5))*l9_220)+float3(l9_213.z);
float3 l9_221=l9_219;
float3 l9_222=l9_221;
return l9_222;
}
else
{
float3 param_8=a;
float3 param_9=b;
float3 l9_223=param_8;
float l9_224=((0.29899999*l9_223.x)+(0.58700001*l9_223.y))+(0.114*l9_223.z);
float l9_225=l9_224;
float l9_226=1.0;
float l9_227=pow(l9_225,1.0/UserUniforms.correctedIntensity);
int l9_228;
if ((int(intensityTextureHasSwappedViews_tmp)!=0))
{
int l9_229=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_229=0;
}
else
{
l9_229=varStereoViewID;
}
int l9_230=l9_229;
l9_228=1-l9_230;
}
else
{
int l9_231=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_231=0;
}
else
{
l9_231=varStereoViewID;
}
int l9_232=l9_231;
l9_228=l9_232;
}
int l9_233=l9_228;
int l9_234=intensityTextureLayout_tmp;
int l9_235=l9_233;
float2 l9_236=float2(l9_227,0.5);
bool l9_237=(int(SC_USE_UV_TRANSFORM_intensityTexture_tmp)!=0);
float3x3 l9_238=UserUniforms.intensityTextureTransform;
int2 l9_239=int2(SC_SOFTWARE_WRAP_MODE_U_intensityTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_intensityTexture_tmp);
bool l9_240=(int(SC_USE_UV_MIN_MAX_intensityTexture_tmp)!=0);
float4 l9_241=UserUniforms.intensityTextureUvMinMax;
bool l9_242=(int(SC_USE_CLAMP_TO_BORDER_intensityTexture_tmp)!=0);
float4 l9_243=UserUniforms.intensityTextureBorderColor;
float l9_244=0.0;
bool l9_245=l9_242&&(!l9_240);
float l9_246=1.0;
float l9_247=l9_236.x;
int l9_248=l9_239.x;
if (l9_248==1)
{
l9_247=fract(l9_247);
}
else
{
if (l9_248==2)
{
float l9_249=fract(l9_247);
float l9_250=l9_247-l9_249;
float l9_251=step(0.25,fract(l9_250*0.5));
l9_247=mix(l9_249,1.0-l9_249,fast::clamp(l9_251,0.0,1.0));
}
}
l9_236.x=l9_247;
float l9_252=l9_236.y;
int l9_253=l9_239.y;
if (l9_253==1)
{
l9_252=fract(l9_252);
}
else
{
if (l9_253==2)
{
float l9_254=fract(l9_252);
float l9_255=l9_252-l9_254;
float l9_256=step(0.25,fract(l9_255*0.5));
l9_252=mix(l9_254,1.0-l9_254,fast::clamp(l9_256,0.0,1.0));
}
}
l9_236.y=l9_252;
if (l9_240)
{
bool l9_257=l9_242;
bool l9_258;
if (l9_257)
{
l9_258=l9_239.x==3;
}
else
{
l9_258=l9_257;
}
float l9_259=l9_236.x;
float l9_260=l9_241.x;
float l9_261=l9_241.z;
bool l9_262=l9_258;
float l9_263=l9_246;
float l9_264=fast::clamp(l9_259,l9_260,l9_261);
float l9_265=step(abs(l9_259-l9_264),9.9999997e-06);
l9_263*=(l9_265+((1.0-float(l9_262))*(1.0-l9_265)));
l9_259=l9_264;
l9_236.x=l9_259;
l9_246=l9_263;
bool l9_266=l9_242;
bool l9_267;
if (l9_266)
{
l9_267=l9_239.y==3;
}
else
{
l9_267=l9_266;
}
float l9_268=l9_236.y;
float l9_269=l9_241.y;
float l9_270=l9_241.w;
bool l9_271=l9_267;
float l9_272=l9_246;
float l9_273=fast::clamp(l9_268,l9_269,l9_270);
float l9_274=step(abs(l9_268-l9_273),9.9999997e-06);
l9_272*=(l9_274+((1.0-float(l9_271))*(1.0-l9_274)));
l9_268=l9_273;
l9_236.y=l9_268;
l9_246=l9_272;
}
float2 l9_275=l9_236;
bool l9_276=l9_237;
float3x3 l9_277=l9_238;
if (l9_276)
{
l9_275=float2((l9_277*float3(l9_275,1.0)).xy);
}
float2 l9_278=l9_275;
l9_236=l9_278;
float l9_279=l9_236.x;
int l9_280=l9_239.x;
bool l9_281=l9_245;
float l9_282=l9_246;
if ((l9_280==0)||(l9_280==3))
{
float l9_283=l9_279;
float l9_284=0.0;
float l9_285=1.0;
bool l9_286=l9_281;
float l9_287=l9_282;
float l9_288=fast::clamp(l9_283,l9_284,l9_285);
float l9_289=step(abs(l9_283-l9_288),9.9999997e-06);
l9_287*=(l9_289+((1.0-float(l9_286))*(1.0-l9_289)));
l9_283=l9_288;
l9_279=l9_283;
l9_282=l9_287;
}
l9_236.x=l9_279;
l9_246=l9_282;
float l9_290=l9_236.y;
int l9_291=l9_239.y;
bool l9_292=l9_245;
float l9_293=l9_246;
if ((l9_291==0)||(l9_291==3))
{
float l9_294=l9_290;
float l9_295=0.0;
float l9_296=1.0;
bool l9_297=l9_292;
float l9_298=l9_293;
float l9_299=fast::clamp(l9_294,l9_295,l9_296);
float l9_300=step(abs(l9_294-l9_299),9.9999997e-06);
l9_298*=(l9_300+((1.0-float(l9_297))*(1.0-l9_300)));
l9_294=l9_299;
l9_290=l9_294;
l9_293=l9_298;
}
l9_236.y=l9_290;
l9_246=l9_293;
float2 l9_301=l9_236;
int l9_302=l9_234;
int l9_303=l9_235;
float l9_304=l9_244;
float2 l9_305=l9_301;
int l9_306=l9_302;
int l9_307=l9_303;
float3 l9_308=float3(0.0);
if (l9_306==0)
{
l9_308=float3(l9_305,0.0);
}
else
{
if (l9_306==1)
{
l9_308=float3(l9_305.x,(l9_305.y*0.5)+(0.5-(float(l9_307)*0.5)),0.0);
}
else
{
l9_308=float3(l9_305,float(l9_307));
}
}
float3 l9_309=l9_308;
float3 l9_310=l9_309;
float4 l9_311=intensityTexture.sample(intensityTextureSmpSC,l9_310.xy,bias(l9_304));
float4 l9_312=l9_311;
if (l9_242)
{
l9_312=mix(l9_243,l9_312,float4(l9_246));
}
float4 l9_313=l9_312;
float3 l9_314=l9_313.xyz;
float3 l9_315=l9_314;
float l9_316=16.0;
float l9_317=((((l9_315.x*256.0)+l9_315.y)+(l9_315.z/256.0))/257.00391)*l9_316;
float l9_318=l9_317;
if ((int(BLEND_MODE_FORGRAY_tmp)!=0))
{
l9_318=fast::max(l9_318,1.0);
}
if ((int(BLEND_MODE_NOTBRIGHT_tmp)!=0))
{
l9_318=fast::min(l9_318,1.0);
}
float l9_319=l9_225;
float3 l9_320=param_8;
float3 l9_321=param_9;
float l9_322=l9_226;
float l9_323=l9_318;
float3 l9_324=transformColor(l9_319,l9_320,l9_321,l9_322,l9_323);
return l9_324;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
float4 sc_OutputMotionVectorIfNeeded(thread const float4& finalColor,thread float4& varPosAndMotion,thread float4& varNormalAndMotion)
{
if ((int(sc_MotionVectorsPass_tmp)!=0))
{
float2 param=float2(varPosAndMotion.w,varNormalAndMotion.w);
float l9_0=(param.x*5.0)+0.5;
float l9_1=floor(l9_0*65535.0);
float l9_2=floor(l9_1*0.00390625);
float2 l9_3=float2(l9_2/255.0,(l9_1-(l9_2*256.0))/255.0);
float l9_4=(param.y*5.0)+0.5;
float l9_5=floor(l9_4*65535.0);
float l9_6=floor(l9_5*0.00390625);
float2 l9_7=float2(l9_6/255.0,(l9_5-(l9_6*256.0))/255.0);
float4 l9_8=float4(l9_3,l9_7);
return l9_8;
}
else
{
return finalColor;
}
}
fragment main_frag_out main_frag(main_frag_in in [[stage_in]],constant sc_Set0& sc_set0 [[buffer(0)]],float4 gl_FragCoord [[position]])
{
main_frag_out out={};
if ((int(sc_DepthOnly_tmp)!=0))
{
return out;
}
if ((sc_StereoRenderingMode_tmp==1)&&(sc_StereoRendering_IsClipDistanceEnabled_tmp==0))
{
if (in.varClipDistance<0.0)
{
discard_fragment();
}
}
ssPreviewInfo PreviewInfo;
PreviewInfo.Color=in.PreviewVertexColor;
PreviewInfo.Saved=((in.PreviewVertexSaved*1.0)!=0.0) ? true : false;
float4 FinalColor=float4(1.0);
ssGlobals Globals;
Globals.gTimeElapsed=(*sc_set0.UserUniforms).sc_Time.x;
Globals.gTimeDelta=(*sc_set0.UserUniforms).sc_Time.y;
if ((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.x!=0u)
{
float4 l9_0=gl_FragCoord;
int2 param=int2(l9_0.xy);
sc_RayTracingHitPayload rhp=sc_RayTracingEvaluateHitPayload(param,(*sc_set0.UserUniforms),(*sc_set0.sc_RayTracingCasterVertexBuffer),(*sc_set0.sc_RayTracingCasterNonAnimatedVertexBuffer),(*sc_set0.sc_RayTracingCasterIndexBuffer),sc_set0.sc_RayTracingHitCasterIdAndBarycentric,sc_set0.sc_RayTracingHitCasterIdAndBarycentricSmpSC,sc_set0.sc_RayTracingRayDirection,sc_set0.sc_RayTracingRayDirectionSmpSC);
if (rhp.id.x!=((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.y&65535u))
{
return out;
}
Globals.Surface_UVCoord0=rhp.uv0;
}
else
{
Globals.Surface_UVCoord0=in.varTex01.xy;
}
float4 Result_N343=float4(0.0);
float param_1=0.0;
float4 param_2=float4(0.0);
float4 param_3=float4(0.0);
ssGlobals param_5=Globals;
float l9_1=0.0;
float l9_2=float((*sc_set0.UserUniforms).Active!=0);
l9_1=l9_2;
float l9_3=0.0;
float l9_4=float((*sc_set0.UserUniforms).Hover!=0);
l9_3=l9_4;
float l9_5=0.0;
l9_5=fast::max(l9_1,l9_3);
param_1=l9_5;
float4 param_4;
if ((param_1*1.0)!=0.0)
{
float4 l9_6=float4(0.0);
float l9_7=0.0;
float4 l9_8=float4(0.0);
float4 l9_9=float4(0.0);
ssGlobals l9_10=param_5;
float l9_11=0.0;
float l9_12=float((*sc_set0.UserUniforms).Hover!=0);
l9_11=l9_12;
l9_7=l9_11;
float4 l9_13;
if ((l9_7*1.0)!=0.0)
{
float4 l9_14=float4(0.0);
float4 l9_15=float4(0.0);
float4 l9_16=float4(0.0);
float4 l9_17=(*sc_set0.UserUniforms).Port_Default_N126;
float4 l9_18;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
float l9_19=0.0;
float l9_20;
if ((int(Tweak_N124_tmp)!=0))
{
l9_20=1.001;
}
else
{
l9_20=0.001;
}
l9_20-=0.001;
l9_19=l9_20;
float l9_21=0.0;
l9_21=(((l9_19-(*sc_set0.UserUniforms).Port_RangeMinA_N136)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N136-(*sc_set0.UserUniforms).Port_RangeMinA_N136)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N136-(*sc_set0.UserUniforms).Port_RangeMinB_N136))+(*sc_set0.UserUniforms).Port_RangeMinB_N136;
l9_15=float4(l9_21);
l9_18=l9_15;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float4 l9_22=float4(0.0);
float4 l9_23=(*sc_set0.UserUniforms).shadowColor;
l9_22=l9_23;
l9_16=l9_22;
l9_18=l9_16;
}
else
{
l9_18=l9_17;
}
}
l9_14=l9_18;
float l9_24=0.0;
float l9_25=(*sc_set0.UserUniforms).shapeAlpha;
l9_24=l9_25;
float2 l9_26=float2(0.0);
l9_26=l9_10.Surface_UVCoord0;
float4 l9_27=float4(0.0);
float4 l9_28=(*sc_set0.UserUniforms).Port_Value0_N154;
float4 l9_29=float4(1.0);
float4 l9_30=(*sc_set0.UserUniforms).Port_Default_N154;
float4 l9_31;
if (int((int(shapeAspectFix_tmp)!=0))==0)
{
l9_31=l9_28;
}
else
{
if (int((int(shapeAspectFix_tmp)!=0))==1)
{
float l9_32=0.0;
l9_32=(*sc_set0.UserUniforms).sc_Camera.aspect;
float l9_33=0.0;
l9_33=1.0/l9_32;
float2 l9_34=float2(0.0);
l9_34.x=(*sc_set0.UserUniforms).Port_Value1_N157;
l9_34.y=l9_33;
l9_29=float4(l9_34,0.0,0.0);
l9_31=l9_29;
}
else
{
l9_31=l9_30;
}
}
l9_27=l9_31;
float2 l9_35=float2(0.0);
l9_35=(l9_26*l9_27.xy)+(*sc_set0.UserUniforms).Port_Input2_N148;
float l9_36=0.0;
float l9_37=(*sc_set0.UserUniforms).shapeWidthX;
l9_36=l9_37;
float l9_38=0.0;
l9_38=l9_36;
float l9_39=0.0;
float l9_40=0.0;
float l9_41=(*sc_set0.UserUniforms).Port_Value0_N287;
float l9_42=0.0;
float l9_43=(*sc_set0.UserUniforms).Port_Default_N287;
float l9_44=0.0;
float l9_45=float((*sc_set0.UserUniforms).xRightPin!=0);
l9_44=l9_45;
float l9_46=0.0;
l9_46=l9_44;
l9_40=l9_46;
l9_40=floor(l9_40);
float l9_47;
if (l9_40==0.0)
{
l9_47=l9_41;
}
else
{
if (l9_40==1.0)
{
float l9_48=0.0;
float l9_49=0.0;
float l9_50=0.0;
float l9_51=(*sc_set0.UserUniforms).Port_Default_N294;
float l9_52;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_53=0.0;
float l9_54=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_55=l9_54+0.001;
l9_55-=0.001;
l9_53=l9_55;
l9_49=l9_53;
l9_52=l9_49;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_56=0.0;
float l9_57=(*sc_set0.UserUniforms).strokeThickness;
l9_56=l9_57;
float l9_58=0.0;
l9_58=l9_56;
float l9_59=0.0;
float l9_60=l9_58;
float l9_61=(*sc_set0.UserUniforms).Port_RangeMinA_N276;
float l9_62=(*sc_set0.UserUniforms).Port_RangeMaxA_N276;
float l9_63=(*sc_set0.UserUniforms).Port_RangeMinB_N276;
float l9_64=(*sc_set0.UserUniforms).Port_RangeMaxB_N276;
float l9_65=(((l9_60-l9_61)/((l9_62-l9_61)+1e-06))*(l9_64-l9_63))+l9_63;
float l9_66;
if (l9_64>l9_63)
{
l9_66=fast::clamp(l9_65,l9_63,l9_64);
}
else
{
l9_66=fast::clamp(l9_65,l9_64,l9_63);
}
l9_65=l9_66;
l9_59=l9_65;
l9_50=l9_59;
l9_52=l9_50;
}
else
{
l9_52=l9_51;
}
}
l9_48=l9_52;
l9_42=l9_48;
l9_47=l9_42;
}
else
{
l9_47=l9_43;
}
}
l9_39=l9_47;
float l9_67=0.0;
float l9_68=0.0;
float l9_69=(*sc_set0.UserUniforms).Port_Value0_N281;
float l9_70=0.0;
float l9_71=(*sc_set0.UserUniforms).Port_Default_N281;
float l9_72=0.0;
float l9_73=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_72=l9_73;
float l9_74=0.0;
l9_74=l9_72;
l9_68=l9_74;
l9_68=floor(l9_68);
float l9_75;
if (l9_68==0.0)
{
l9_75=l9_69;
}
else
{
if (l9_68==1.0)
{
float l9_76=0.0;
float l9_77=0.0;
float l9_78=0.0;
float l9_79=(*sc_set0.UserUniforms).Port_Default_N296;
float l9_80;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_81=0.0;
float l9_82=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_83=l9_82+0.001;
l9_83-=0.001;
l9_81=l9_83;
l9_77=l9_81;
l9_80=l9_77;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_84=0.0;
float l9_85=(*sc_set0.UserUniforms).strokeThickness;
l9_84=l9_85;
float l9_86=0.0;
l9_86=l9_84;
float l9_87=0.0;
float l9_88=l9_86;
float l9_89=(*sc_set0.UserUniforms).Port_RangeMinA_N295;
float l9_90=(*sc_set0.UserUniforms).Port_RangeMaxA_N295;
float l9_91=(*sc_set0.UserUniforms).Port_RangeMinB_N295;
float l9_92=(*sc_set0.UserUniforms).Port_RangeMaxB_N295;
float l9_93=(((l9_88-l9_89)/((l9_90-l9_89)+1e-06))*(l9_92-l9_91))+l9_91;
float l9_94;
if (l9_92>l9_91)
{
l9_94=fast::clamp(l9_93,l9_91,l9_92);
}
else
{
l9_94=fast::clamp(l9_93,l9_92,l9_91);
}
l9_93=l9_94;
l9_87=l9_93;
l9_78=l9_87;
l9_80=l9_78;
}
else
{
l9_80=l9_79;
}
}
l9_76=l9_80;
l9_70=l9_76;
l9_75=l9_70;
}
else
{
l9_75=l9_71;
}
}
l9_67=l9_75;
float l9_95=0.0;
float l9_96=l9_38;
float l9_97=(*sc_set0.UserUniforms).Port_RangeMinA_N268;
float l9_98=(*sc_set0.UserUniforms).Port_RangeMaxA_N268;
float l9_99=l9_39;
float l9_100=l9_67;
float l9_101=(((l9_96-l9_97)/((l9_98-l9_97)+1e-06))*(l9_100-l9_99))+l9_99;
float l9_102;
if (l9_100>l9_99)
{
l9_102=fast::clamp(l9_101,l9_99,l9_100);
}
else
{
l9_102=fast::clamp(l9_101,l9_100,l9_99);
}
l9_101=l9_102;
l9_95=l9_101;
float l9_103=0.0;
float l9_104=(*sc_set0.UserUniforms).xOffset;
l9_103=l9_104;
float l9_105=0.0;
l9_105=l9_103;
float l9_106=0.0;
float l9_107=0.0;
float l9_108=(*sc_set0.UserUniforms).Port_Value0_N282;
float l9_109=(*sc_set0.UserUniforms).Port_Value1_N282;
float l9_110=(*sc_set0.UserUniforms).Port_Default_N282;
float l9_111=0.0;
float l9_112=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_111=l9_112;
float l9_113=0.0;
l9_113=l9_111;
l9_107=l9_113;
l9_107=floor(l9_107);
float l9_114;
if (l9_107==0.0)
{
l9_114=l9_108;
}
else
{
if (l9_107==1.0)
{
l9_114=l9_109;
}
else
{
l9_114=l9_110;
}
}
l9_106=l9_114;
float l9_115=0.0;
l9_115=l9_105+l9_106;
float l9_116=0.0;
l9_116=1.0-l9_115;
float l9_117=0.0;
float l9_118=(*sc_set0.UserUniforms).Port_Value0_N308;
float l9_119=0.0;
float l9_120=(*sc_set0.UserUniforms).Port_Default_N308;
float l9_121;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_121=l9_118;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_122=0.0;
float l9_123=0.0;
float l9_124=(*sc_set0.UserUniforms).Port_Value0_N304;
float l9_125=0.0;
float l9_126=(*sc_set0.UserUniforms).Port_Default_N304;
float l9_127=0.0;
float l9_128=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_127=l9_128;
float l9_129=0.0;
l9_129=l9_127;
l9_123=l9_129;
l9_123=floor(l9_123);
float l9_130;
if (l9_123==0.0)
{
l9_130=l9_124;
}
else
{
if (l9_123==1.0)
{
float l9_131=0.0;
float l9_132=(*sc_set0.UserUniforms).strokeThickness;
l9_131=l9_132;
float l9_133=0.0;
l9_133=l9_131;
float l9_134=0.0;
float l9_135=l9_133;
float l9_136=(*sc_set0.UserUniforms).Port_RangeMinA_N303;
float l9_137=(*sc_set0.UserUniforms).Port_RangeMaxA_N303;
float l9_138=(*sc_set0.UserUniforms).Port_RangeMinB_N303;
float l9_139=(*sc_set0.UserUniforms).Port_RangeMaxB_N303;
float l9_140=(((l9_135-l9_136)/((l9_137-l9_136)+1e-06))*(l9_139-l9_138))+l9_138;
float l9_141;
if (l9_139>l9_138)
{
l9_141=fast::clamp(l9_140,l9_138,l9_139);
}
else
{
l9_141=fast::clamp(l9_140,l9_139,l9_138);
}
l9_140=l9_141;
l9_134=l9_140;
l9_125=l9_134;
l9_130=l9_125;
}
else
{
l9_130=l9_126;
}
}
l9_122=l9_130;
l9_119=l9_122;
l9_121=l9_119;
}
else
{
l9_121=l9_120;
}
}
l9_117=l9_121;
float l9_142=0.0;
l9_142=l9_116+l9_117;
float l9_143=0.0;
l9_143=l9_95+l9_142;
float l9_144=0.0;
float l9_145=(*sc_set0.UserUniforms).shapeHeightY;
l9_144=l9_145;
float l9_146=0.0;
l9_146=l9_144;
float l9_147=0.0;
float l9_148=0.0;
float l9_149=(*sc_set0.UserUniforms).Port_Value0_N289;
float l9_150=0.0;
float l9_151=(*sc_set0.UserUniforms).Port_Default_N289;
float l9_152=0.0;
float l9_153=float((*sc_set0.UserUniforms).yUpPin!=0);
l9_152=l9_153;
float l9_154=0.0;
l9_154=l9_152;
l9_148=l9_154;
l9_148=floor(l9_148);
float l9_155;
if (l9_148==0.0)
{
l9_155=l9_149;
}
else
{
if (l9_148==1.0)
{
float l9_156=0.0;
float l9_157=0.0;
float l9_158=0.0;
float l9_159=(*sc_set0.UserUniforms).Port_Default_N297;
float l9_160;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_161=0.0;
float l9_162=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_163=l9_162+0.001;
l9_163-=0.001;
l9_161=l9_163;
l9_157=l9_161;
l9_160=l9_157;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_164=0.0;
float l9_165=(*sc_set0.UserUniforms).strokeThickness;
l9_164=l9_165;
float l9_166=0.0;
l9_166=l9_164;
float l9_167=0.0;
float l9_168=l9_166;
float l9_169=(*sc_set0.UserUniforms).Port_RangeMinA_N299;
float l9_170=(*sc_set0.UserUniforms).Port_RangeMaxA_N299;
float l9_171=(*sc_set0.UserUniforms).Port_RangeMinB_N299;
float l9_172=(*sc_set0.UserUniforms).Port_RangeMaxB_N299;
float l9_173=(((l9_168-l9_169)/((l9_170-l9_169)+1e-06))*(l9_172-l9_171))+l9_171;
float l9_174;
if (l9_172>l9_171)
{
l9_174=fast::clamp(l9_173,l9_171,l9_172);
}
else
{
l9_174=fast::clamp(l9_173,l9_172,l9_171);
}
l9_173=l9_174;
l9_167=l9_173;
l9_158=l9_167;
l9_160=l9_158;
}
else
{
l9_160=l9_159;
}
}
l9_156=l9_160;
l9_150=l9_156;
l9_155=l9_150;
}
else
{
l9_155=l9_151;
}
}
l9_147=l9_155;
float l9_175=0.0;
float l9_176=0.0;
float l9_177=(*sc_set0.UserUniforms).Port_Value0_N286;
float l9_178=0.0;
float l9_179=(*sc_set0.UserUniforms).Port_Default_N286;
float l9_180=0.0;
float l9_181=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_180=l9_181;
float l9_182=0.0;
l9_182=l9_180;
l9_176=l9_182;
l9_176=floor(l9_176);
float l9_183;
if (l9_176==0.0)
{
l9_183=l9_177;
}
else
{
if (l9_176==1.0)
{
float l9_184=0.0;
float l9_185=0.0;
float l9_186=0.0;
float l9_187=(*sc_set0.UserUniforms).Port_Default_N298;
float l9_188;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_189=0.0;
float l9_190=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_191=l9_190+0.001;
l9_191-=0.001;
l9_189=l9_191;
l9_185=l9_189;
l9_188=l9_185;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_192=0.0;
float l9_193=(*sc_set0.UserUniforms).strokeThickness;
l9_192=l9_193;
float l9_194=0.0;
l9_194=l9_192;
float l9_195=0.0;
float l9_196=l9_194;
float l9_197=(*sc_set0.UserUniforms).Port_RangeMinA_N300;
float l9_198=(*sc_set0.UserUniforms).Port_RangeMaxA_N300;
float l9_199=(*sc_set0.UserUniforms).Port_RangeMinB_N300;
float l9_200=(*sc_set0.UserUniforms).Port_RangeMaxB_N300;
float l9_201=(((l9_196-l9_197)/((l9_198-l9_197)+1e-06))*(l9_200-l9_199))+l9_199;
float l9_202;
if (l9_200>l9_199)
{
l9_202=fast::clamp(l9_201,l9_199,l9_200);
}
else
{
l9_202=fast::clamp(l9_201,l9_200,l9_199);
}
l9_201=l9_202;
l9_195=l9_201;
l9_186=l9_195;
l9_188=l9_186;
}
else
{
l9_188=l9_187;
}
}
l9_184=l9_188;
l9_178=l9_184;
l9_183=l9_178;
}
else
{
l9_183=l9_179;
}
}
l9_175=l9_183;
float l9_203=0.0;
float l9_204=l9_146;
float l9_205=(*sc_set0.UserUniforms).Port_RangeMinA_N277;
float l9_206=(*sc_set0.UserUniforms).Port_RangeMaxA_N277;
float l9_207=l9_147;
float l9_208=l9_175;
float l9_209=(((l9_204-l9_205)/((l9_206-l9_205)+1e-06))*(l9_208-l9_207))+l9_207;
float l9_210;
if (l9_208>l9_207)
{
l9_210=fast::clamp(l9_209,l9_207,l9_208);
}
else
{
l9_210=fast::clamp(l9_209,l9_208,l9_207);
}
l9_209=l9_210;
l9_203=l9_209;
float l9_211=0.0;
float l9_212=(*sc_set0.UserUniforms).yOffset;
l9_211=l9_212;
float l9_213=0.0;
l9_213=l9_211;
float l9_214=0.0;
float l9_215=0.0;
float l9_216=(*sc_set0.UserUniforms).Port_Value0_N293;
float l9_217=(*sc_set0.UserUniforms).Port_Value1_N293;
float l9_218=(*sc_set0.UserUniforms).Port_Default_N293;
float l9_219=0.0;
float l9_220=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_219=l9_220;
float l9_221=0.0;
l9_221=l9_219;
l9_215=l9_221;
l9_215=floor(l9_215);
float l9_222;
if (l9_215==0.0)
{
l9_222=l9_216;
}
else
{
if (l9_215==1.0)
{
l9_222=l9_217;
}
else
{
l9_222=l9_218;
}
}
l9_214=l9_222;
float l9_223=0.0;
l9_223=l9_213+l9_214;
float l9_224=0.0;
float l9_225=(*sc_set0.UserUniforms).Port_Value0_N301;
float l9_226=0.0;
float l9_227=(*sc_set0.UserUniforms).Port_Default_N301;
float l9_228;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_228=l9_225;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_229=0.0;
float l9_230=0.0;
float l9_231=(*sc_set0.UserUniforms).Port_Value0_N306;
float l9_232=0.0;
float l9_233=(*sc_set0.UserUniforms).Port_Default_N306;
float l9_234=0.0;
float l9_235=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_234=l9_235;
float l9_236=0.0;
l9_236=l9_234;
l9_230=l9_236;
l9_230=floor(l9_230);
float l9_237;
if (l9_230==0.0)
{
l9_237=l9_231;
}
else
{
if (l9_230==1.0)
{
float l9_238=0.0;
float l9_239=(*sc_set0.UserUniforms).strokeThickness;
l9_238=l9_239;
float l9_240=0.0;
l9_240=l9_238;
float l9_241=0.0;
float l9_242=l9_240;
float l9_243=(*sc_set0.UserUniforms).Port_RangeMinA_N305;
float l9_244=(*sc_set0.UserUniforms).Port_RangeMaxA_N305;
float l9_245=(*sc_set0.UserUniforms).Port_RangeMinB_N305;
float l9_246=(*sc_set0.UserUniforms).Port_RangeMaxB_N305;
float l9_247=(((l9_242-l9_243)/((l9_244-l9_243)+1e-06))*(l9_246-l9_245))+l9_245;
float l9_248;
if (l9_246>l9_245)
{
l9_248=fast::clamp(l9_247,l9_245,l9_246);
}
else
{
l9_248=fast::clamp(l9_247,l9_246,l9_245);
}
l9_247=l9_248;
l9_241=l9_247;
l9_232=l9_241;
l9_237=l9_232;
}
else
{
l9_237=l9_233;
}
}
l9_229=l9_237;
l9_226=l9_229;
l9_228=l9_226;
}
else
{
l9_228=l9_227;
}
}
l9_224=l9_228;
float l9_249=0.0;
l9_249=l9_223+l9_224;
float l9_250=0.0;
l9_250=l9_203+l9_249;
float2 l9_251=float2(0.0);
l9_251.x=l9_143;
l9_251.y=l9_250;
float2 l9_252=float2(0.0);
l9_252=l9_251;
float2 l9_253=float2(0.0);
l9_253=l9_35+l9_252;
float l9_254=0.0;
float l9_255=(*sc_set0.UserUniforms).Port_Value0_N132;
float l9_256=0.0;
float l9_257=(*sc_set0.UserUniforms).Port_Default_N132;
float l9_258;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_258=l9_255;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_259=0.0;
float l9_260=(*sc_set0.UserUniforms).shadowRotation;
l9_259=l9_260;
float l9_261=0.0;
l9_261=l9_259+(*sc_set0.UserUniforms).Port_Input1_N141;
l9_256=l9_261;
l9_258=l9_256;
}
else
{
l9_258=l9_257;
}
}
l9_254=l9_258;
float2 l9_262=float2(0.0);
float2 l9_263=l9_253;
float l9_264=l9_254;
float2 l9_265=(*sc_set0.UserUniforms).Port_Center_N092;
float l9_266=sin(radians(l9_264));
float l9_267=cos(radians(l9_264));
float2 l9_268=l9_263-l9_265;
l9_268=float2(dot(float2(l9_267,l9_266),l9_268),dot(float2(-l9_266,l9_267),l9_268))+l9_265;
l9_262=l9_268;
float l9_269=0.0;
float l9_270=(*sc_set0.UserUniforms).Port_Value0_N131;
float l9_271=0.0;
float l9_272=(*sc_set0.UserUniforms).Port_Default_N131;
float l9_273;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_273=l9_270;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_274=0.0;
float l9_275=(*sc_set0.UserUniforms).shadowDistance;
l9_274=l9_275;
l9_271=l9_274;
l9_273=l9_271;
}
else
{
l9_273=l9_272;
}
}
l9_269=l9_273;
float l9_276=0.0;
l9_276=l9_269/(*sc_set0.UserUniforms).Port_Input1_N160;
float2 l9_277=float2(0.0);
l9_277.x=(*sc_set0.UserUniforms).Port_Value1_N097;
l9_277.y=l9_276;
float2 l9_278=float2(0.0);
l9_278=l9_262+l9_277;
float l9_279=0.0;
l9_279=l9_254+(*sc_set0.UserUniforms).Port_Input1_N263;
float l9_280=0.0;
l9_280=1.0-l9_279;
float2 l9_281=float2(0.0);
float2 l9_282=l9_278;
float l9_283=l9_280;
float2 l9_284=(*sc_set0.UserUniforms).Port_Center_N094;
float l9_285=sin(radians(l9_283));
float l9_286=cos(radians(l9_283));
float2 l9_287=l9_282-l9_284;
l9_287=float2(dot(float2(l9_286,l9_285),l9_287),dot(float2(-l9_285,l9_286),l9_287))+l9_284;
l9_281=l9_287;
float l9_288=0.0;
float l9_289=(*sc_set0.UserUniforms).shapeRotation;
l9_288=l9_289;
float2 l9_290=float2(0.0);
float2 l9_291=l9_281;
float l9_292=l9_288;
float2 l9_293=(*sc_set0.UserUniforms).Port_Center_N100;
float l9_294=sin(radians(l9_292));
float l9_295=cos(radians(l9_292));
float2 l9_296=l9_291-l9_293;
l9_296=float2(dot(float2(l9_295,l9_294),l9_296),dot(float2(-l9_294,l9_295),l9_296))+l9_293;
l9_290=l9_296;
float l9_297=0.0;
float l9_298=(*sc_set0.UserUniforms).Port_Value0_N125;
float l9_299=0.0;
float l9_300=(*sc_set0.UserUniforms).Port_Default_N125;
float l9_301;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_301=l9_298;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_302=0.0;
float l9_303=(*sc_set0.UserUniforms).shadowBlur;
l9_302=l9_303;
l9_299=l9_302;
l9_301=l9_299;
}
else
{
l9_301=l9_300;
}
}
l9_297=l9_301;
float l9_304=0.0;
float l9_305=l9_297;
float l9_306=(*sc_set0.UserUniforms).Port_RangeMinA_N138;
float l9_307=(*sc_set0.UserUniforms).Port_RangeMaxA_N138;
float l9_308=(*sc_set0.UserUniforms).Port_RangeMinB_N138;
float l9_309=(*sc_set0.UserUniforms).Port_RangeMaxB_N138;
float l9_310=(((l9_305-l9_306)/((l9_307-l9_306)+1e-06))*(l9_309-l9_308))+l9_308;
float l9_311;
if (l9_309>l9_308)
{
l9_311=fast::clamp(l9_310,l9_308,l9_309);
}
else
{
l9_311=fast::clamp(l9_310,l9_309,l9_308);
}
l9_310=l9_311;
l9_304=l9_310;
float2 l9_312=float2(0.0);
l9_312=((l9_290-(*sc_set0.UserUniforms).Port_Center_N137)*float2(l9_304))+(*sc_set0.UserUniforms).Port_Center_N137;
float2 l9_313=float2(0.0);
l9_313=l9_312*float2((*sc_set0.UserUniforms).Port_Input1_N019);
float2 l9_314=float2(0.0);
l9_314=l9_313+float2((*sc_set0.UserUniforms).Port_Input1_N020);
float2 l9_315=float2(0.0);
l9_315=abs(l9_314);
float l9_316=0.0;
float l9_317=(*sc_set0.UserUniforms).Port_Value0_N122;
float l9_318=0.0;
float l9_319=(*sc_set0.UserUniforms).Port_Default_N122;
float l9_320;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_320=l9_317;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_321=0.0;
float l9_322=(*sc_set0.UserUniforms).strokeThickness;
l9_321=l9_322;
l9_318=l9_321;
l9_320=l9_318;
}
else
{
l9_320=l9_319;
}
}
l9_316=l9_320;
float l9_323=0.0;
l9_323=l9_316/(*sc_set0.UserUniforms).Port_Input1_N056;
float l9_324=0.0;
l9_324=1.0-l9_323;
float l9_325=0.0;
float l9_326=l9_36;
float l9_327=(*sc_set0.UserUniforms).Port_RangeMinA_N021;
float l9_328=(*sc_set0.UserUniforms).Port_RangeMaxA_N021;
float l9_329=(*sc_set0.UserUniforms).Port_RangeMinB_N021;
float l9_330=l9_324;
float l9_331=(((l9_326-l9_327)/((l9_328-l9_327)+1e-06))*(l9_330-l9_329))+l9_329;
float l9_332;
if (l9_330>l9_329)
{
l9_332=fast::clamp(l9_331,l9_329,l9_330);
}
else
{
l9_332=fast::clamp(l9_331,l9_330,l9_329);
}
l9_331=l9_332;
l9_325=l9_331;
float l9_333=0.0;
l9_333=1.0-l9_323;
float l9_334=0.0;
float l9_335=l9_144;
float l9_336=(*sc_set0.UserUniforms).Port_RangeMinA_N022;
float l9_337=(*sc_set0.UserUniforms).Port_RangeMaxA_N022;
float l9_338=(*sc_set0.UserUniforms).Port_RangeMinB_N022;
float l9_339=l9_333;
float l9_340=(((l9_335-l9_336)/((l9_337-l9_336)+1e-06))*(l9_339-l9_338))+l9_338;
float l9_341;
if (l9_339>l9_338)
{
l9_341=fast::clamp(l9_340,l9_338,l9_339);
}
else
{
l9_341=fast::clamp(l9_340,l9_339,l9_338);
}
l9_340=l9_341;
l9_334=l9_340;
float2 l9_342=float2(0.0);
l9_342.x=l9_325;
l9_342.y=l9_334;
float2 l9_343=float2(0.0);
l9_343=l9_315-l9_342;
float l9_344=0.0;
float l9_345=(*sc_set0.UserUniforms).shapeRoundness;
l9_344=l9_345;
float l9_346=0.0;
l9_346=abs(l9_344);
float l9_347=0.0;
l9_347=fast::min(l9_346,l9_325);
float l9_348=0.0;
l9_348=fast::min(l9_347,l9_334);
float l9_349=0.0;
l9_349=fast::max(l9_348,(*sc_set0.UserUniforms).Port_Input1_N030);
float2 l9_350=float2(0.0);
l9_350=l9_343+float2(l9_349);
float2 l9_351=float2(0.0);
l9_351=fast::max(l9_350,(*sc_set0.UserUniforms).Port_Input1_N032);
float l9_352=0.0;
l9_352=length(l9_351);
float l9_353=0.0;
l9_353=l9_352/l9_349;
float l9_354=0.0;
l9_354=1.0-l9_353;
float l9_355=0.0;
float l9_356=l9_354;
float l9_357=fwidth(l9_356);
l9_355=l9_357;
float l9_358=0.0;
l9_358=l9_297*(*sc_set0.UserUniforms).Port_Input1_N127;
float l9_359=0.0;
l9_359=(((l9_355-(*sc_set0.UserUniforms).Port_RangeMinA_N135)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N135-(*sc_set0.UserUniforms).Port_RangeMinA_N135)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N135-l9_358))+l9_358;
float l9_360=0.0;
l9_360=l9_354/l9_359;
float l9_361=0.0;
l9_361=fast::clamp(l9_360+0.001,(*sc_set0.UserUniforms).Port_Input1_N038+0.001,(*sc_set0.UserUniforms).Port_Input2_N038+0.001)-0.001;
float l9_362=0.0;
l9_362=l9_24*l9_361;
float l9_363=0.0;
l9_363=1.0-l9_360;
float l9_364=0.0;
l9_364=fast::clamp(l9_363+0.001,(*sc_set0.UserUniforms).Port_Input1_N264+0.001,(*sc_set0.UserUniforms).Port_Input2_N264+0.001)-0.001;
float l9_365=0.0;
float l9_366=l9_36;
float l9_367=(*sc_set0.UserUniforms).Port_RangeMinA_N039;
float l9_368=(*sc_set0.UserUniforms).Port_RangeMaxA_N039;
float l9_369=l9_323;
float l9_370=(*sc_set0.UserUniforms).Port_RangeMaxB_N039;
float l9_371=(((l9_366-l9_367)/((l9_368-l9_367)+1e-06))*(l9_370-l9_369))+l9_369;
float l9_372;
if (l9_370>l9_369)
{
l9_372=fast::clamp(l9_371,l9_369,l9_370);
}
else
{
l9_372=fast::clamp(l9_371,l9_370,l9_369);
}
l9_371=l9_372;
l9_365=l9_371;
float l9_373=0.0;
float l9_374=l9_144;
float l9_375=(*sc_set0.UserUniforms).Port_RangeMinA_N042;
float l9_376=(*sc_set0.UserUniforms).Port_RangeMaxA_N042;
float l9_377=l9_323;
float l9_378=(*sc_set0.UserUniforms).Port_RangeMaxB_N042;
float l9_379=(((l9_374-l9_375)/((l9_376-l9_375)+1e-06))*(l9_378-l9_377))+l9_377;
float l9_380;
if (l9_378>l9_377)
{
l9_380=fast::clamp(l9_379,l9_377,l9_378);
}
else
{
l9_380=fast::clamp(l9_379,l9_378,l9_377);
}
l9_379=l9_380;
l9_373=l9_379;
float2 l9_381=float2(0.0);
l9_381.x=l9_365;
l9_381.y=l9_373;
float2 l9_382=float2(0.0);
l9_382=l9_315-l9_381;
float l9_383=0.0;
float l9_384=l9_344;
float l9_385=(*sc_set0.UserUniforms).Port_RangeMinA_N057;
float l9_386=(*sc_set0.UserUniforms).Port_RangeMaxA_N057;
float l9_387=(*sc_set0.UserUniforms).Port_RangeMinB_N057;
float l9_388=(*sc_set0.UserUniforms).Port_RangeMaxB_N057;
float l9_389=(((l9_384-l9_385)/((l9_386-l9_385)+1e-06))*(l9_388-l9_387))+l9_387;
float l9_390;
if (l9_388>l9_387)
{
l9_390=fast::clamp(l9_389,l9_387,l9_388);
}
else
{
l9_390=fast::clamp(l9_389,l9_388,l9_387);
}
l9_389=l9_390;
l9_383=l9_389;
float l9_391=0.0;
l9_391=(((l9_316-(*sc_set0.UserUniforms).Port_RangeMinA_N101)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N101-(*sc_set0.UserUniforms).Port_RangeMinA_N101)+1e-06))*(l9_383-(*sc_set0.UserUniforms).Port_RangeMinB_N101))+(*sc_set0.UserUniforms).Port_RangeMinB_N101;
float l9_392=0.0;
float l9_393=l9_344;
float l9_394=(*sc_set0.UserUniforms).Port_RangeMinA_N047;
float l9_395=(*sc_set0.UserUniforms).Port_RangeMaxA_N047;
float l9_396=l9_391;
float l9_397=(*sc_set0.UserUniforms).Port_RangeMaxB_N047;
float l9_398=(((l9_393-l9_394)/((l9_395-l9_394)+1e-06))*(l9_397-l9_396))+l9_396;
float l9_399;
if (l9_397>l9_396)
{
l9_399=fast::clamp(l9_398,l9_396,l9_397);
}
else
{
l9_399=fast::clamp(l9_398,l9_397,l9_396);
}
l9_398=l9_399;
l9_392=l9_398;
float l9_400=0.0;
l9_400=abs(l9_392);
float l9_401=0.0;
l9_401=fast::min(l9_400,l9_365);
float l9_402=0.0;
l9_402=fast::min(l9_401,l9_373);
float l9_403=0.0;
l9_403=fast::max(l9_402,(*sc_set0.UserUniforms).Port_Input1_N051);
float2 l9_404=float2(0.0);
l9_404=l9_382+float2(l9_403);
float2 l9_405=float2(0.0);
l9_405=fast::max(l9_404,(*sc_set0.UserUniforms).Port_Input1_N053);
float l9_406=0.0;
l9_406=length(l9_405);
float l9_407=0.0;
l9_407=l9_406/l9_403;
float l9_408=0.0;
l9_408=1.0-l9_407;
float l9_409=0.0;
float l9_410=l9_408;
float l9_411=fwidth(l9_410);
l9_409=l9_411;
float l9_412=0.0;
l9_412=(((l9_409-(*sc_set0.UserUniforms).Port_RangeMinA_N133)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N133-(*sc_set0.UserUniforms).Port_RangeMinA_N133)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N133-l9_297))+l9_297;
float l9_413=0.0;
l9_413=l9_408/l9_412;
float l9_414=0.0;
l9_414=fast::clamp(l9_413+0.001,(*sc_set0.UserUniforms).Port_Input1_N064+0.001,(*sc_set0.UserUniforms).Port_Input2_N064+0.001)-0.001;
float l9_415=0.0;
l9_415=l9_364*l9_414;
float l9_416=0.0;
l9_416=fast::clamp(l9_415+0.001,(*sc_set0.UserUniforms).Port_Input1_N066+0.001,(*sc_set0.UserUniforms).Port_Input2_N066+0.001)-0.001;
float l9_417=0.0;
float l9_418=(*sc_set0.UserUniforms).Port_Value0_N068;
float l9_419=0.0;
float l9_420=(*sc_set0.UserUniforms).Port_Default_N068;
float l9_421;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_421=l9_418;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_422=0.0;
float l9_423=(*sc_set0.UserUniforms).strokeAlpha;
l9_422=l9_423;
l9_419=l9_422;
l9_421=l9_419;
}
else
{
l9_421=l9_420;
}
}
l9_417=l9_421;
float l9_424=0.0;
l9_424=l9_416*l9_417;
float l9_425=0.0;
l9_425=l9_362+l9_424;
float l9_426=0.0;
l9_426=fast::clamp(l9_425+0.001,(*sc_set0.UserUniforms).Port_Input1_N072+0.001,(*sc_set0.UserUniforms).Port_Input2_N072+0.001)-0.001;
float l9_427=0.0;
float l9_428=(*sc_set0.UserUniforms).Port_Value0_N123;
float l9_429=0.0;
float l9_430=(*sc_set0.UserUniforms).Port_Default_N123;
float l9_431;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_431=l9_428;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_432=0.0;
float l9_433=(*sc_set0.UserUniforms).shadowAlpha;
l9_432=l9_433;
l9_429=l9_432;
l9_431=l9_429;
}
else
{
l9_431=l9_430;
}
}
l9_427=l9_431;
float l9_434=0.0;
l9_434=l9_426*l9_427;
float4 l9_435=float4(0.0);
l9_435=float4(l9_14.xyz.x,l9_14.xyz.y,l9_14.xyz.z,l9_435.w);
l9_435.w=l9_434;
float l9_436=0.0;
l9_436=l9_435.w;
float l9_437=0.0;
float l9_438;
if ((int(Tweak_N124_tmp)!=0))
{
l9_438=1.001;
}
else
{
l9_438=0.001;
}
l9_438-=0.001;
l9_437=l9_438;
float l9_439=0.0;
l9_439=l9_436*l9_437;
float4 l9_440=float4(0.0);
l9_440=float4(l9_435.xyz.x,l9_435.xyz.y,l9_435.xyz.z,l9_440.w);
l9_440.w=l9_439;
float l9_441=0.0;
float l9_442;
if ((int(innerCutout_tmp)!=0))
{
l9_442=1.001;
}
else
{
l9_442=0.001;
}
l9_442-=0.001;
l9_441=l9_442;
float2 l9_443=float2(0.0);
float2 l9_444=l9_253;
float l9_445=l9_288;
float2 l9_446=(*sc_set0.UserUniforms).Port_Center_N113;
float l9_447=sin(radians(l9_445));
float l9_448=cos(radians(l9_445));
float2 l9_449=l9_444-l9_446;
l9_449=float2(dot(float2(l9_448,l9_447),l9_449),dot(float2(-l9_447,l9_448),l9_449))+l9_446;
l9_443=l9_449;
float2 l9_450=float2(0.0);
l9_450=l9_443*float2((*sc_set0.UserUniforms).Port_Input1_N089);
float2 l9_451=float2(0.0);
l9_451=l9_450+float2((*sc_set0.UserUniforms).Port_Input1_N090);
float2 l9_452=float2(0.0);
l9_452=abs(l9_451);
float2 l9_453=float2(0.0);
l9_453.x=l9_325;
l9_453.y=l9_334;
float2 l9_454=float2(0.0);
l9_454=l9_452-l9_453;
float l9_455=0.0;
l9_455=abs(l9_344);
float l9_456=0.0;
l9_456=fast::min(l9_455,l9_325);
float l9_457=0.0;
l9_457=fast::min(l9_456,l9_334);
float l9_458=0.0;
l9_458=fast::max(l9_457,(*sc_set0.UserUniforms).Port_Input1_N103);
float2 l9_459=float2(0.0);
l9_459=l9_454+float2(l9_458);
float2 l9_460=float2(0.0);
l9_460=fast::max(l9_459,(*sc_set0.UserUniforms).Port_Input1_N105);
float l9_461=0.0;
l9_461=length(l9_460);
float l9_462=0.0;
l9_462=l9_461/l9_458;
float l9_463=0.0;
l9_463=1.0-l9_462;
float l9_464=0.0;
float l9_465=l9_463;
float l9_466=fwidth(l9_465);
l9_464=l9_466;
float l9_467=0.0;
l9_467=l9_463/l9_464;
float l9_468=0.0;
l9_468=fast::clamp(l9_467+0.001,(*sc_set0.UserUniforms).Port_Input1_N112+0.001,(*sc_set0.UserUniforms).Port_Input2_N112+0.001)-0.001;
float l9_469=0.0;
l9_469=l9_441*l9_468;
float4 l9_470=float4(0.0);
l9_470=mix(l9_440,float4((*sc_set0.UserUniforms).Port_Input1_N259),float4(l9_469));
float4 l9_471=float4(0.0);
float4 l9_472=float4(0.0);
float4 l9_473=float4(0.0);
float4 l9_474=float4(0.0);
float4 l9_475=(*sc_set0.UserUniforms).Port_Default_N149;
ssGlobals l9_476=l9_10;
float4 l9_477;
if (NODE_161_DROPLIST_ITEM_tmp==0)
{
float4 l9_478=float4(0.0);
float4 l9_479=(*sc_set0.UserUniforms).shapeColor;
l9_478=l9_479;
float4 l9_480=float4(0.0);
l9_480=float4(l9_478.x,l9_478.y,l9_478.z,1.0);
l9_472=l9_480;
l9_477=l9_472;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==1)
{
float2 l9_481=float2(0.0);
l9_481=l9_476.Surface_UVCoord0;
float2 l9_482=float2(0.0);
float2 l9_483=(*sc_set0.UserUniforms).shapeScale;
l9_482=l9_483;
float2 l9_484=float2(0.0);
float2 l9_485=(*sc_set0.UserUniforms).shapeOffset;
l9_484=l9_485;
float2 l9_486=float2(0.0);
l9_486=(l9_481*l9_482)+l9_484;
float4 l9_487=float4(0.0);
int l9_488;
if ((int(shapeTextureHasSwappedViews_tmp)!=0))
{
int l9_489=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_489=0;
}
else
{
l9_489=in.varStereoViewID;
}
int l9_490=l9_489;
l9_488=1-l9_490;
}
else
{
int l9_491=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_491=0;
}
else
{
l9_491=in.varStereoViewID;
}
int l9_492=l9_491;
l9_488=l9_492;
}
int l9_493=l9_488;
int l9_494=shapeTextureLayout_tmp;
int l9_495=l9_493;
float2 l9_496=l9_486;
bool l9_497=(int(SC_USE_UV_TRANSFORM_shapeTexture_tmp)!=0);
float3x3 l9_498=(*sc_set0.UserUniforms).shapeTextureTransform;
int2 l9_499=int2(SC_SOFTWARE_WRAP_MODE_U_shapeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_shapeTexture_tmp);
bool l9_500=(int(SC_USE_UV_MIN_MAX_shapeTexture_tmp)!=0);
float4 l9_501=(*sc_set0.UserUniforms).shapeTextureUvMinMax;
bool l9_502=(int(SC_USE_CLAMP_TO_BORDER_shapeTexture_tmp)!=0);
float4 l9_503=(*sc_set0.UserUniforms).shapeTextureBorderColor;
float l9_504=0.0;
bool l9_505=l9_502&&(!l9_500);
float l9_506=1.0;
float l9_507=l9_496.x;
int l9_508=l9_499.x;
if (l9_508==1)
{
l9_507=fract(l9_507);
}
else
{
if (l9_508==2)
{
float l9_509=fract(l9_507);
float l9_510=l9_507-l9_509;
float l9_511=step(0.25,fract(l9_510*0.5));
l9_507=mix(l9_509,1.0-l9_509,fast::clamp(l9_511,0.0,1.0));
}
}
l9_496.x=l9_507;
float l9_512=l9_496.y;
int l9_513=l9_499.y;
if (l9_513==1)
{
l9_512=fract(l9_512);
}
else
{
if (l9_513==2)
{
float l9_514=fract(l9_512);
float l9_515=l9_512-l9_514;
float l9_516=step(0.25,fract(l9_515*0.5));
l9_512=mix(l9_514,1.0-l9_514,fast::clamp(l9_516,0.0,1.0));
}
}
l9_496.y=l9_512;
if (l9_500)
{
bool l9_517=l9_502;
bool l9_518;
if (l9_517)
{
l9_518=l9_499.x==3;
}
else
{
l9_518=l9_517;
}
float l9_519=l9_496.x;
float l9_520=l9_501.x;
float l9_521=l9_501.z;
bool l9_522=l9_518;
float l9_523=l9_506;
float l9_524=fast::clamp(l9_519,l9_520,l9_521);
float l9_525=step(abs(l9_519-l9_524),9.9999997e-06);
l9_523*=(l9_525+((1.0-float(l9_522))*(1.0-l9_525)));
l9_519=l9_524;
l9_496.x=l9_519;
l9_506=l9_523;
bool l9_526=l9_502;
bool l9_527;
if (l9_526)
{
l9_527=l9_499.y==3;
}
else
{
l9_527=l9_526;
}
float l9_528=l9_496.y;
float l9_529=l9_501.y;
float l9_530=l9_501.w;
bool l9_531=l9_527;
float l9_532=l9_506;
float l9_533=fast::clamp(l9_528,l9_529,l9_530);
float l9_534=step(abs(l9_528-l9_533),9.9999997e-06);
l9_532*=(l9_534+((1.0-float(l9_531))*(1.0-l9_534)));
l9_528=l9_533;
l9_496.y=l9_528;
l9_506=l9_532;
}
float2 l9_535=l9_496;
bool l9_536=l9_497;
float3x3 l9_537=l9_498;
if (l9_536)
{
l9_535=float2((l9_537*float3(l9_535,1.0)).xy);
}
float2 l9_538=l9_535;
l9_496=l9_538;
float l9_539=l9_496.x;
int l9_540=l9_499.x;
bool l9_541=l9_505;
float l9_542=l9_506;
if ((l9_540==0)||(l9_540==3))
{
float l9_543=l9_539;
float l9_544=0.0;
float l9_545=1.0;
bool l9_546=l9_541;
float l9_547=l9_542;
float l9_548=fast::clamp(l9_543,l9_544,l9_545);
float l9_549=step(abs(l9_543-l9_548),9.9999997e-06);
l9_547*=(l9_549+((1.0-float(l9_546))*(1.0-l9_549)));
l9_543=l9_548;
l9_539=l9_543;
l9_542=l9_547;
}
l9_496.x=l9_539;
l9_506=l9_542;
float l9_550=l9_496.y;
int l9_551=l9_499.y;
bool l9_552=l9_505;
float l9_553=l9_506;
if ((l9_551==0)||(l9_551==3))
{
float l9_554=l9_550;
float l9_555=0.0;
float l9_556=1.0;
bool l9_557=l9_552;
float l9_558=l9_553;
float l9_559=fast::clamp(l9_554,l9_555,l9_556);
float l9_560=step(abs(l9_554-l9_559),9.9999997e-06);
l9_558*=(l9_560+((1.0-float(l9_557))*(1.0-l9_560)));
l9_554=l9_559;
l9_550=l9_554;
l9_553=l9_558;
}
l9_496.y=l9_550;
l9_506=l9_553;
float2 l9_561=l9_496;
int l9_562=l9_494;
int l9_563=l9_495;
float l9_564=l9_504;
float2 l9_565=l9_561;
int l9_566=l9_562;
int l9_567=l9_563;
float3 l9_568=float3(0.0);
if (l9_566==0)
{
l9_568=float3(l9_565,0.0);
}
else
{
if (l9_566==1)
{
l9_568=float3(l9_565.x,(l9_565.y*0.5)+(0.5-(float(l9_567)*0.5)),0.0);
}
else
{
l9_568=float3(l9_565,float(l9_567));
}
}
float3 l9_569=l9_568;
float3 l9_570=l9_569;
float4 l9_571=sc_set0.shapeTexture.sample(sc_set0.shapeTextureSmpSC,l9_570.xy,bias(l9_564));
float4 l9_572=l9_571;
if (l9_502)
{
l9_572=mix(l9_503,l9_572,float4(l9_506));
}
float4 l9_573=l9_572;
l9_487=l9_573;
float4 l9_574=float4(0.0);
float4 l9_575=(*sc_set0.UserUniforms).shapeColor;
l9_574=l9_575;
float4 l9_576=float4(0.0);
l9_576=l9_487*l9_574;
l9_473=l9_576;
l9_477=l9_473;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==2)
{
float4 l9_577=float4(0.0);
float4 l9_578=float4(0.0);
float4 l9_579=float4(0.0);
float4 l9_580=(*sc_set0.UserUniforms).Port_Default_N209;
ssGlobals l9_581=l9_476;
float4 l9_582;
if (int((int(toQuadShapeGrad_tmp)!=0))==0)
{
float4 l9_583=float4(0.0);
float4 l9_584=(*sc_set0.UserUniforms).shapeGradColorA;
l9_583=l9_584;
float4 l9_585=float4(0.0);
l9_585=l9_583;
float4 l9_586=float4(0.0);
float4 l9_587=(*sc_set0.UserUniforms).shapeGradColorB;
l9_586=l9_587;
float4 l9_588=float4(0.0);
l9_588=l9_586;
float2 l9_589=float2(0.0);
l9_589=l9_581.Surface_UVCoord0;
float2 l9_590=float2(0.0);
l9_590=(((l9_589-float2((*sc_set0.UserUniforms).Port_RangeMinA_N175))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N175-(*sc_set0.UserUniforms).Port_RangeMinA_N175)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N175-(*sc_set0.UserUniforms).Port_RangeMinB_N175))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N175);
float2 l9_591=float2(0.0);
float2 l9_592=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_591=l9_592;
float2 l9_593=float2(0.0);
l9_593=l9_591;
float2 l9_594=float2(0.0);
l9_594=((l9_590-(*sc_set0.UserUniforms).Port_Center_N177)*l9_593)+(*sc_set0.UserUniforms).Port_Center_N177;
float2 l9_595=float2(0.0);
float2 l9_596=(*sc_set0.UserUniforms).shapeGradPointA;
l9_595=l9_596;
float2 l9_597=float2(0.0);
l9_597=l9_595;
float2 l9_598=float2(0.0);
l9_598=l9_594-l9_597;
float2 l9_599=float2(0.0);
float2 l9_600=(*sc_set0.UserUniforms).shapeGradPointB;
l9_599=l9_600;
float2 l9_601=float2(0.0);
l9_601=l9_599;
float2 l9_602=float2(0.0);
l9_602=l9_601-l9_597;
float l9_603=0.0;
l9_603=dot(l9_598,l9_602);
float l9_604=0.0;
l9_604=dot(l9_602,l9_602);
float l9_605=0.0;
l9_605=l9_603/l9_604;
float l9_606=0.0;
l9_606=fast::clamp(l9_605+0.001,(*sc_set0.UserUniforms).Port_Input1_N185+0.001,(*sc_set0.UserUniforms).Port_Input2_N185+0.001)-0.001;
float l9_607=0.0;
l9_607=smoothstep((*sc_set0.UserUniforms).Port_Input0_N186,(*sc_set0.UserUniforms).Port_Input1_N186,l9_606);
float4 l9_608=float4(0.0);
l9_608=mix(l9_585,l9_588,float4(l9_607));
float4 l9_609=float4(0.0);
l9_609=l9_608;
l9_578=l9_609;
l9_582=l9_578;
}
else
{
if (int((int(toQuadShapeGrad_tmp)!=0))==1)
{
float4 l9_610=float4(0.0);
float4 l9_611=(*sc_set0.UserUniforms).shapeGradColorA;
l9_610=l9_611;
float4 l9_612=float4(0.0);
l9_612=l9_610;
float4 l9_613=float4(0.0);
float4 l9_614=(*sc_set0.UserUniforms).shapeGradColorB;
l9_613=l9_614;
float4 l9_615=float4(0.0);
l9_615=l9_613;
float2 l9_616=float2(0.0);
l9_616=l9_581.Surface_UVCoord0;
float2 l9_617=float2(0.0);
l9_617=(((l9_616-float2((*sc_set0.UserUniforms).Port_RangeMinA_N198))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N198-(*sc_set0.UserUniforms).Port_RangeMinA_N198)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N198-(*sc_set0.UserUniforms).Port_RangeMinB_N198))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N198);
float2 l9_618=float2(0.0);
float2 l9_619=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_618=l9_619;
float2 l9_620=float2(0.0);
l9_620=l9_618;
float2 l9_621=float2(0.0);
float2 l9_622=(*sc_set0.UserUniforms).shapeQuadOffset;
l9_621=l9_622;
float2 l9_623=float2(0.0);
l9_623=l9_621;
float2 l9_624=float2(0.0);
l9_624=(l9_617*l9_620)+l9_623;
float l9_625=0.0;
float l9_626=0.0;
float2 l9_627=l9_624;
float l9_628=l9_627.x;
float l9_629=l9_627.y;
l9_625=l9_628;
l9_626=l9_629;
float4 l9_630=float4(0.0);
l9_630=mix(l9_612,l9_615,float4(l9_625));
float4 l9_631=float4(0.0);
float4 l9_632=(*sc_set0.UserUniforms).shapeGradColorC;
l9_631=l9_632;
float4 l9_633=float4(0.0);
l9_633=l9_631;
float4 l9_634=float4(0.0);
float4 l9_635=(*sc_set0.UserUniforms).shapeGradColorD;
l9_634=l9_635;
float4 l9_636=float4(0.0);
l9_636=l9_634;
float4 l9_637=float4(0.0);
l9_637=mix(l9_633,l9_636,float4(l9_625));
float4 l9_638=float4(0.0);
l9_638=mix(l9_630,l9_637,float4(l9_626));
float4 l9_639=float4(0.0);
l9_639=l9_638;
l9_579=l9_639;
l9_582=l9_579;
}
else
{
l9_582=l9_580;
}
}
l9_577=l9_582;
l9_474=l9_577;
l9_477=l9_474;
}
else
{
l9_477=l9_475;
}
}
}
l9_471=l9_477;
float l9_640=0.0;
l9_640=fast::clamp(l9_467+0.001,(*sc_set0.UserUniforms).Port_Input1_N265+0.001,(*sc_set0.UserUniforms).Port_Input2_N265+0.001)-0.001;
float l9_641=0.0;
l9_641=1.0-l9_640;
float2 l9_642=float2(0.0);
l9_642.x=l9_365;
l9_642.y=l9_373;
float2 l9_643=float2(0.0);
l9_643=l9_452-l9_642;
float l9_644=0.0;
l9_644=abs(l9_392);
float l9_645=0.0;
l9_645=fast::min(l9_644,l9_365);
float l9_646=0.0;
l9_646=fast::min(l9_645,l9_373);
float l9_647=0.0;
l9_647=fast::max(l9_646,(*sc_set0.UserUniforms).Port_Input1_N098);
float2 l9_648=float2(0.0);
l9_648=l9_643+float2(l9_647);
float2 l9_649=float2(0.0);
l9_649=fast::max(l9_648,(*sc_set0.UserUniforms).Port_Input1_N115);
float l9_650=0.0;
l9_650=length(l9_649);
float l9_651=0.0;
l9_651=l9_650/l9_647;
float l9_652=0.0;
l9_652=1.0-l9_651;
float l9_653=0.0;
float l9_654=l9_652;
float l9_655=fwidth(l9_654);
l9_653=l9_655;
float l9_656=0.0;
l9_656=l9_652/l9_653;
float l9_657=0.0;
l9_657=fast::clamp(l9_656+0.001,(*sc_set0.UserUniforms).Port_Input1_N142+0.001,(*sc_set0.UserUniforms).Port_Input2_N142+0.001)-0.001;
float l9_658=0.0;
l9_658=l9_641*l9_657;
float l9_659=0.0;
l9_659=fast::clamp(l9_658+0.001,(*sc_set0.UserUniforms).Port_Input1_N144+0.001,(*sc_set0.UserUniforms).Port_Input2_N144+0.001)-0.001;
float l9_660=0.0;
l9_660=l9_659*l9_417;
float l9_661=0.0;
l9_661=l9_468*l9_24;
float l9_662=0.0;
l9_662=l9_660+l9_661;
float l9_663=0.0;
l9_663=fast::max(l9_660,l9_661);
float l9_664=0.0;
l9_664=l9_662-l9_663;
float l9_665=0.0;
l9_665=l9_664+l9_661;
float l9_666=0.0;
float l9_667;
if ((int(shapeColorInvert_tmp)!=0))
{
l9_667=1.001;
}
else
{
l9_667=0.001;
}
l9_667-=0.001;
l9_666=l9_667;
float l9_668=0.0;
l9_668=1.0-l9_666;
float l9_669=0.0;
float l9_670=l9_665;
float l9_671=(*sc_set0.UserUniforms).Port_RangeMinA_N171;
float l9_672=(*sc_set0.UserUniforms).Port_RangeMaxA_N171;
float l9_673=l9_668;
float l9_674=l9_666;
float l9_675=(((l9_670-l9_671)/((l9_672-l9_671)+1e-06))*(l9_674-l9_673))+l9_673;
float l9_676;
if (l9_674>l9_673)
{
l9_676=fast::clamp(l9_675,l9_673,l9_674);
}
else
{
l9_676=fast::clamp(l9_675,l9_674,l9_673);
}
l9_675=l9_676;
l9_669=l9_675;
float4 l9_677=float4(0.0);
l9_677=mix(l9_470,l9_471,float4(l9_669));
float4 l9_678=float4(0.0);
float4 l9_679=(*sc_set0.UserUniforms).Port_Value0_N325;
float4 l9_680=float4(0.0);
float4 l9_681=(*sc_set0.UserUniforms).Port_Default_N325;
ssGlobals l9_682=l9_10;
float4 l9_683;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_683=l9_679;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float4 l9_684=float4(0.0);
float4 l9_685=float4(0.0);
float4 l9_686=float4(0.0);
float4 l9_687=float4(0.0);
float4 l9_688=(*sc_set0.UserUniforms).Port_Default_N324;
ssGlobals l9_689=l9_682;
float4 l9_690;
if (NODE_164_DROPLIST_ITEM_tmp==0)
{
float4 l9_691=float4(0.0);
float4 l9_692=(*sc_set0.UserUniforms).strokeColor;
l9_691=l9_692;
l9_685=l9_691;
l9_690=l9_685;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==1)
{
float2 l9_693=float2(0.0);
l9_693=l9_689.Surface_UVCoord0;
float2 l9_694=float2(0.0);
float2 l9_695=(*sc_set0.UserUniforms).strokeScale;
l9_694=l9_695;
float2 l9_696=float2(0.0);
float2 l9_697=(*sc_set0.UserUniforms).strokeOffset;
l9_696=l9_697;
float2 l9_698=float2(0.0);
l9_698=(l9_693*l9_694)+l9_696;
float4 l9_699=float4(0.0);
int l9_700;
if ((int(strokeTextureHasSwappedViews_tmp)!=0))
{
int l9_701=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_701=0;
}
else
{
l9_701=in.varStereoViewID;
}
int l9_702=l9_701;
l9_700=1-l9_702;
}
else
{
int l9_703=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_703=0;
}
else
{
l9_703=in.varStereoViewID;
}
int l9_704=l9_703;
l9_700=l9_704;
}
int l9_705=l9_700;
int l9_706=strokeTextureLayout_tmp;
int l9_707=l9_705;
float2 l9_708=l9_698;
bool l9_709=(int(SC_USE_UV_TRANSFORM_strokeTexture_tmp)!=0);
float3x3 l9_710=(*sc_set0.UserUniforms).strokeTextureTransform;
int2 l9_711=int2(SC_SOFTWARE_WRAP_MODE_U_strokeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_strokeTexture_tmp);
bool l9_712=(int(SC_USE_UV_MIN_MAX_strokeTexture_tmp)!=0);
float4 l9_713=(*sc_set0.UserUniforms).strokeTextureUvMinMax;
bool l9_714=(int(SC_USE_CLAMP_TO_BORDER_strokeTexture_tmp)!=0);
float4 l9_715=(*sc_set0.UserUniforms).strokeTextureBorderColor;
float l9_716=0.0;
bool l9_717=l9_714&&(!l9_712);
float l9_718=1.0;
float l9_719=l9_708.x;
int l9_720=l9_711.x;
if (l9_720==1)
{
l9_719=fract(l9_719);
}
else
{
if (l9_720==2)
{
float l9_721=fract(l9_719);
float l9_722=l9_719-l9_721;
float l9_723=step(0.25,fract(l9_722*0.5));
l9_719=mix(l9_721,1.0-l9_721,fast::clamp(l9_723,0.0,1.0));
}
}
l9_708.x=l9_719;
float l9_724=l9_708.y;
int l9_725=l9_711.y;
if (l9_725==1)
{
l9_724=fract(l9_724);
}
else
{
if (l9_725==2)
{
float l9_726=fract(l9_724);
float l9_727=l9_724-l9_726;
float l9_728=step(0.25,fract(l9_727*0.5));
l9_724=mix(l9_726,1.0-l9_726,fast::clamp(l9_728,0.0,1.0));
}
}
l9_708.y=l9_724;
if (l9_712)
{
bool l9_729=l9_714;
bool l9_730;
if (l9_729)
{
l9_730=l9_711.x==3;
}
else
{
l9_730=l9_729;
}
float l9_731=l9_708.x;
float l9_732=l9_713.x;
float l9_733=l9_713.z;
bool l9_734=l9_730;
float l9_735=l9_718;
float l9_736=fast::clamp(l9_731,l9_732,l9_733);
float l9_737=step(abs(l9_731-l9_736),9.9999997e-06);
l9_735*=(l9_737+((1.0-float(l9_734))*(1.0-l9_737)));
l9_731=l9_736;
l9_708.x=l9_731;
l9_718=l9_735;
bool l9_738=l9_714;
bool l9_739;
if (l9_738)
{
l9_739=l9_711.y==3;
}
else
{
l9_739=l9_738;
}
float l9_740=l9_708.y;
float l9_741=l9_713.y;
float l9_742=l9_713.w;
bool l9_743=l9_739;
float l9_744=l9_718;
float l9_745=fast::clamp(l9_740,l9_741,l9_742);
float l9_746=step(abs(l9_740-l9_745),9.9999997e-06);
l9_744*=(l9_746+((1.0-float(l9_743))*(1.0-l9_746)));
l9_740=l9_745;
l9_708.y=l9_740;
l9_718=l9_744;
}
float2 l9_747=l9_708;
bool l9_748=l9_709;
float3x3 l9_749=l9_710;
if (l9_748)
{
l9_747=float2((l9_749*float3(l9_747,1.0)).xy);
}
float2 l9_750=l9_747;
l9_708=l9_750;
float l9_751=l9_708.x;
int l9_752=l9_711.x;
bool l9_753=l9_717;
float l9_754=l9_718;
if ((l9_752==0)||(l9_752==3))
{
float l9_755=l9_751;
float l9_756=0.0;
float l9_757=1.0;
bool l9_758=l9_753;
float l9_759=l9_754;
float l9_760=fast::clamp(l9_755,l9_756,l9_757);
float l9_761=step(abs(l9_755-l9_760),9.9999997e-06);
l9_759*=(l9_761+((1.0-float(l9_758))*(1.0-l9_761)));
l9_755=l9_760;
l9_751=l9_755;
l9_754=l9_759;
}
l9_708.x=l9_751;
l9_718=l9_754;
float l9_762=l9_708.y;
int l9_763=l9_711.y;
bool l9_764=l9_717;
float l9_765=l9_718;
if ((l9_763==0)||(l9_763==3))
{
float l9_766=l9_762;
float l9_767=0.0;
float l9_768=1.0;
bool l9_769=l9_764;
float l9_770=l9_765;
float l9_771=fast::clamp(l9_766,l9_767,l9_768);
float l9_772=step(abs(l9_766-l9_771),9.9999997e-06);
l9_770*=(l9_772+((1.0-float(l9_769))*(1.0-l9_772)));
l9_766=l9_771;
l9_762=l9_766;
l9_765=l9_770;
}
l9_708.y=l9_762;
l9_718=l9_765;
float2 l9_773=l9_708;
int l9_774=l9_706;
int l9_775=l9_707;
float l9_776=l9_716;
float2 l9_777=l9_773;
int l9_778=l9_774;
int l9_779=l9_775;
float3 l9_780=float3(0.0);
if (l9_778==0)
{
l9_780=float3(l9_777,0.0);
}
else
{
if (l9_778==1)
{
l9_780=float3(l9_777.x,(l9_777.y*0.5)+(0.5-(float(l9_779)*0.5)),0.0);
}
else
{
l9_780=float3(l9_777,float(l9_779));
}
}
float3 l9_781=l9_780;
float3 l9_782=l9_781;
float4 l9_783=sc_set0.strokeTexture.sample(sc_set0.strokeTextureSmpSC,l9_782.xy,bias(l9_776));
float4 l9_784=l9_783;
if (l9_714)
{
l9_784=mix(l9_715,l9_784,float4(l9_718));
}
float4 l9_785=l9_784;
l9_699=l9_785;
float4 l9_786=float4(0.0);
float4 l9_787=(*sc_set0.UserUniforms).strokeColor;
l9_786=l9_787;
float4 l9_788=float4(0.0);
l9_788=l9_699*l9_786;
l9_686=l9_788;
l9_690=l9_686;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==2)
{
float4 l9_789=float4(0.0);
float4 l9_790=float4(0.0);
float4 l9_791=float4(0.0);
float4 l9_792=(*sc_set0.UserUniforms).Port_Default_N323;
ssGlobals l9_793=l9_689;
float4 l9_794;
if (int((int(toQuadStrokeGrad_tmp)!=0))==0)
{
float4 l9_795=float4(0.0);
float4 l9_796=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_795=l9_796;
float4 l9_797=float4(0.0);
l9_797=l9_795;
float4 l9_798=float4(0.0);
float4 l9_799=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_798=l9_799;
float4 l9_800=float4(0.0);
l9_800=l9_798;
float2 l9_801=float2(0.0);
l9_801=l9_793.Surface_UVCoord0;
float2 l9_802=float2(0.0);
l9_802=(((l9_801-float2((*sc_set0.UserUniforms).Port_RangeMinA_N231))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N231-(*sc_set0.UserUniforms).Port_RangeMinA_N231)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N231-(*sc_set0.UserUniforms).Port_RangeMinB_N231))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N231);
float2 l9_803=float2(0.0);
float2 l9_804=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_803=l9_804;
float2 l9_805=float2(0.0);
l9_805=l9_803;
float2 l9_806=float2(0.0);
l9_806=((l9_802-(*sc_set0.UserUniforms).Port_Center_N233)*l9_805)+(*sc_set0.UserUniforms).Port_Center_N233;
float2 l9_807=float2(0.0);
float2 l9_808=(*sc_set0.UserUniforms).shapeGradPointA2;
l9_807=l9_808;
float2 l9_809=float2(0.0);
l9_809=l9_807;
float2 l9_810=float2(0.0);
l9_810=l9_806-l9_809;
float2 l9_811=float2(0.0);
float2 l9_812=(*sc_set0.UserUniforms).shapeGradPointB2;
l9_811=l9_812;
float2 l9_813=float2(0.0);
l9_813=l9_811;
float2 l9_814=float2(0.0);
l9_814=l9_813-l9_809;
float l9_815=0.0;
l9_815=dot(l9_810,l9_814);
float l9_816=0.0;
l9_816=dot(l9_814,l9_814);
float l9_817=0.0;
l9_817=l9_815/l9_816;
float l9_818=0.0;
l9_818=fast::clamp(l9_817+0.001,(*sc_set0.UserUniforms).Port_Input1_N241+0.001,(*sc_set0.UserUniforms).Port_Input2_N241+0.001)-0.001;
float l9_819=0.0;
l9_819=smoothstep((*sc_set0.UserUniforms).Port_Input0_N242,(*sc_set0.UserUniforms).Port_Input1_N242,l9_818);
float4 l9_820=float4(0.0);
l9_820=mix(l9_797,l9_800,float4(l9_819));
float4 l9_821=float4(0.0);
l9_821=l9_820;
l9_790=l9_821;
l9_794=l9_790;
}
else
{
if (int((int(toQuadStrokeGrad_tmp)!=0))==1)
{
float4 l9_822=float4(0.0);
float4 l9_823=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_822=l9_823;
float4 l9_824=float4(0.0);
l9_824=l9_822;
float4 l9_825=float4(0.0);
float4 l9_826=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_825=l9_826;
float4 l9_827=float4(0.0);
l9_827=l9_825;
float2 l9_828=float2(0.0);
l9_828=l9_793.Surface_UVCoord0;
float2 l9_829=float2(0.0);
l9_829=(((l9_828-float2((*sc_set0.UserUniforms).Port_RangeMinA_N252))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N252-(*sc_set0.UserUniforms).Port_RangeMinA_N252)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N252-(*sc_set0.UserUniforms).Port_RangeMinB_N252))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N252);
float2 l9_830=float2(0.0);
float2 l9_831=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_830=l9_831;
float2 l9_832=float2(0.0);
l9_832=l9_830;
float2 l9_833=float2(0.0);
float2 l9_834=(*sc_set0.UserUniforms).shapeQuadOffset2;
l9_833=l9_834;
float2 l9_835=float2(0.0);
l9_835=l9_833;
float2 l9_836=float2(0.0);
l9_836=(l9_829*l9_832)+l9_835;
float l9_837=0.0;
float l9_838=0.0;
float2 l9_839=l9_836;
float l9_840=l9_839.x;
float l9_841=l9_839.y;
l9_837=l9_840;
l9_838=l9_841;
float4 l9_842=float4(0.0);
l9_842=mix(l9_824,l9_827,float4(l9_837));
float4 l9_843=float4(0.0);
float4 l9_844=(*sc_set0.UserUniforms).shapeGradColorC2;
l9_843=l9_844;
float4 l9_845=float4(0.0);
l9_845=l9_843;
float4 l9_846=float4(0.0);
float4 l9_847=(*sc_set0.UserUniforms).shapeGradColorD2;
l9_846=l9_847;
float4 l9_848=float4(0.0);
l9_848=l9_846;
float4 l9_849=float4(0.0);
l9_849=mix(l9_845,l9_848,float4(l9_837));
float4 l9_850=float4(0.0);
l9_850=mix(l9_842,l9_849,float4(l9_838));
float4 l9_851=float4(0.0);
l9_851=l9_850;
l9_791=l9_851;
l9_794=l9_791;
}
else
{
l9_794=l9_792;
}
}
l9_789=l9_794;
l9_687=l9_789;
l9_690=l9_687;
}
else
{
l9_690=l9_688;
}
}
}
l9_684=l9_690;
l9_680=l9_684;
l9_683=l9_680;
}
else
{
l9_683=l9_681;
}
}
l9_678=l9_683;
float4 l9_852=float4(0.0);
l9_852=mix(l9_677,l9_678,float4(l9_660));
l9_8=l9_852;
l9_13=l9_8;
}
else
{
float4 l9_853=float4(0.0);
float4 l9_854=float4(0.0);
float4 l9_855=float4(0.0);
float4 l9_856=(*sc_set0.UserUniforms).Port_Default_N126;
float4 l9_857;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
float l9_858=0.0;
float l9_859;
if ((int(Tweak_N124_tmp)!=0))
{
l9_859=1.001;
}
else
{
l9_859=0.001;
}
l9_859-=0.001;
l9_858=l9_859;
float l9_860=0.0;
l9_860=(((l9_858-(*sc_set0.UserUniforms).Port_RangeMinA_N136)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N136-(*sc_set0.UserUniforms).Port_RangeMinA_N136)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N136-(*sc_set0.UserUniforms).Port_RangeMinB_N136))+(*sc_set0.UserUniforms).Port_RangeMinB_N136;
l9_854=float4(l9_860);
l9_857=l9_854;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float4 l9_861=float4(0.0);
float4 l9_862=(*sc_set0.UserUniforms).shadowColor;
l9_861=l9_862;
l9_855=l9_861;
l9_857=l9_855;
}
else
{
l9_857=l9_856;
}
}
l9_853=l9_857;
float l9_863=0.0;
float l9_864=(*sc_set0.UserUniforms).shapeAlpha;
l9_863=l9_864;
float2 l9_865=float2(0.0);
l9_865=l9_10.Surface_UVCoord0;
float4 l9_866=float4(0.0);
float4 l9_867=(*sc_set0.UserUniforms).Port_Value0_N154;
float4 l9_868=float4(1.0);
float4 l9_869=(*sc_set0.UserUniforms).Port_Default_N154;
float4 l9_870;
if (int((int(shapeAspectFix_tmp)!=0))==0)
{
l9_870=l9_867;
}
else
{
if (int((int(shapeAspectFix_tmp)!=0))==1)
{
float l9_871=0.0;
l9_871=(*sc_set0.UserUniforms).sc_Camera.aspect;
float l9_872=0.0;
l9_872=1.0/l9_871;
float2 l9_873=float2(0.0);
l9_873.x=(*sc_set0.UserUniforms).Port_Value1_N157;
l9_873.y=l9_872;
l9_868=float4(l9_873,0.0,0.0);
l9_870=l9_868;
}
else
{
l9_870=l9_869;
}
}
l9_866=l9_870;
float2 l9_874=float2(0.0);
l9_874=(l9_865*l9_866.xy)+(*sc_set0.UserUniforms).Port_Input2_N148;
float l9_875=0.0;
float l9_876=(*sc_set0.UserUniforms).shapeWidthX;
l9_875=l9_876;
float l9_877=0.0;
l9_877=l9_875;
float l9_878=0.0;
float l9_879=0.0;
float l9_880=(*sc_set0.UserUniforms).Port_Value0_N287;
float l9_881=0.0;
float l9_882=(*sc_set0.UserUniforms).Port_Default_N287;
float l9_883=0.0;
float l9_884=float((*sc_set0.UserUniforms).xRightPin!=0);
l9_883=l9_884;
float l9_885=0.0;
l9_885=l9_883;
l9_879=l9_885;
l9_879=floor(l9_879);
float l9_886;
if (l9_879==0.0)
{
l9_886=l9_880;
}
else
{
if (l9_879==1.0)
{
float l9_887=0.0;
float l9_888=0.0;
float l9_889=0.0;
float l9_890=(*sc_set0.UserUniforms).Port_Default_N294;
float l9_891;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_892=0.0;
float l9_893=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_894=l9_893+0.001;
l9_894-=0.001;
l9_892=l9_894;
l9_888=l9_892;
l9_891=l9_888;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_895=0.0;
float l9_896=(*sc_set0.UserUniforms).strokeThickness;
l9_895=l9_896;
float l9_897=0.0;
l9_897=l9_895;
float l9_898=0.0;
float l9_899=l9_897;
float l9_900=(*sc_set0.UserUniforms).Port_RangeMinA_N276;
float l9_901=(*sc_set0.UserUniforms).Port_RangeMaxA_N276;
float l9_902=(*sc_set0.UserUniforms).Port_RangeMinB_N276;
float l9_903=(*sc_set0.UserUniforms).Port_RangeMaxB_N276;
float l9_904=(((l9_899-l9_900)/((l9_901-l9_900)+1e-06))*(l9_903-l9_902))+l9_902;
float l9_905;
if (l9_903>l9_902)
{
l9_905=fast::clamp(l9_904,l9_902,l9_903);
}
else
{
l9_905=fast::clamp(l9_904,l9_903,l9_902);
}
l9_904=l9_905;
l9_898=l9_904;
l9_889=l9_898;
l9_891=l9_889;
}
else
{
l9_891=l9_890;
}
}
l9_887=l9_891;
l9_881=l9_887;
l9_886=l9_881;
}
else
{
l9_886=l9_882;
}
}
l9_878=l9_886;
float l9_906=0.0;
float l9_907=0.0;
float l9_908=(*sc_set0.UserUniforms).Port_Value0_N281;
float l9_909=0.0;
float l9_910=(*sc_set0.UserUniforms).Port_Default_N281;
float l9_911=0.0;
float l9_912=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_911=l9_912;
float l9_913=0.0;
l9_913=l9_911;
l9_907=l9_913;
l9_907=floor(l9_907);
float l9_914;
if (l9_907==0.0)
{
l9_914=l9_908;
}
else
{
if (l9_907==1.0)
{
float l9_915=0.0;
float l9_916=0.0;
float l9_917=0.0;
float l9_918=(*sc_set0.UserUniforms).Port_Default_N296;
float l9_919;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_920=0.0;
float l9_921=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_922=l9_921+0.001;
l9_922-=0.001;
l9_920=l9_922;
l9_916=l9_920;
l9_919=l9_916;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_923=0.0;
float l9_924=(*sc_set0.UserUniforms).strokeThickness;
l9_923=l9_924;
float l9_925=0.0;
l9_925=l9_923;
float l9_926=0.0;
float l9_927=l9_925;
float l9_928=(*sc_set0.UserUniforms).Port_RangeMinA_N295;
float l9_929=(*sc_set0.UserUniforms).Port_RangeMaxA_N295;
float l9_930=(*sc_set0.UserUniforms).Port_RangeMinB_N295;
float l9_931=(*sc_set0.UserUniforms).Port_RangeMaxB_N295;
float l9_932=(((l9_927-l9_928)/((l9_929-l9_928)+1e-06))*(l9_931-l9_930))+l9_930;
float l9_933;
if (l9_931>l9_930)
{
l9_933=fast::clamp(l9_932,l9_930,l9_931);
}
else
{
l9_933=fast::clamp(l9_932,l9_931,l9_930);
}
l9_932=l9_933;
l9_926=l9_932;
l9_917=l9_926;
l9_919=l9_917;
}
else
{
l9_919=l9_918;
}
}
l9_915=l9_919;
l9_909=l9_915;
l9_914=l9_909;
}
else
{
l9_914=l9_910;
}
}
l9_906=l9_914;
float l9_934=0.0;
float l9_935=l9_877;
float l9_936=(*sc_set0.UserUniforms).Port_RangeMinA_N268;
float l9_937=(*sc_set0.UserUniforms).Port_RangeMaxA_N268;
float l9_938=l9_878;
float l9_939=l9_906;
float l9_940=(((l9_935-l9_936)/((l9_937-l9_936)+1e-06))*(l9_939-l9_938))+l9_938;
float l9_941;
if (l9_939>l9_938)
{
l9_941=fast::clamp(l9_940,l9_938,l9_939);
}
else
{
l9_941=fast::clamp(l9_940,l9_939,l9_938);
}
l9_940=l9_941;
l9_934=l9_940;
float l9_942=0.0;
float l9_943=(*sc_set0.UserUniforms).xOffset;
l9_942=l9_943;
float l9_944=0.0;
l9_944=l9_942;
float l9_945=0.0;
float l9_946=0.0;
float l9_947=(*sc_set0.UserUniforms).Port_Value0_N282;
float l9_948=(*sc_set0.UserUniforms).Port_Value1_N282;
float l9_949=(*sc_set0.UserUniforms).Port_Default_N282;
float l9_950=0.0;
float l9_951=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_950=l9_951;
float l9_952=0.0;
l9_952=l9_950;
l9_946=l9_952;
l9_946=floor(l9_946);
float l9_953;
if (l9_946==0.0)
{
l9_953=l9_947;
}
else
{
if (l9_946==1.0)
{
l9_953=l9_948;
}
else
{
l9_953=l9_949;
}
}
l9_945=l9_953;
float l9_954=0.0;
l9_954=l9_944+l9_945;
float l9_955=0.0;
l9_955=1.0-l9_954;
float l9_956=0.0;
float l9_957=(*sc_set0.UserUniforms).Port_Value0_N308;
float l9_958=0.0;
float l9_959=(*sc_set0.UserUniforms).Port_Default_N308;
float l9_960;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_960=l9_957;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_961=0.0;
float l9_962=0.0;
float l9_963=(*sc_set0.UserUniforms).Port_Value0_N304;
float l9_964=0.0;
float l9_965=(*sc_set0.UserUniforms).Port_Default_N304;
float l9_966=0.0;
float l9_967=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_966=l9_967;
float l9_968=0.0;
l9_968=l9_966;
l9_962=l9_968;
l9_962=floor(l9_962);
float l9_969;
if (l9_962==0.0)
{
l9_969=l9_963;
}
else
{
if (l9_962==1.0)
{
float l9_970=0.0;
float l9_971=(*sc_set0.UserUniforms).strokeThickness;
l9_970=l9_971;
float l9_972=0.0;
l9_972=l9_970;
float l9_973=0.0;
float l9_974=l9_972;
float l9_975=(*sc_set0.UserUniforms).Port_RangeMinA_N303;
float l9_976=(*sc_set0.UserUniforms).Port_RangeMaxA_N303;
float l9_977=(*sc_set0.UserUniforms).Port_RangeMinB_N303;
float l9_978=(*sc_set0.UserUniforms).Port_RangeMaxB_N303;
float l9_979=(((l9_974-l9_975)/((l9_976-l9_975)+1e-06))*(l9_978-l9_977))+l9_977;
float l9_980;
if (l9_978>l9_977)
{
l9_980=fast::clamp(l9_979,l9_977,l9_978);
}
else
{
l9_980=fast::clamp(l9_979,l9_978,l9_977);
}
l9_979=l9_980;
l9_973=l9_979;
l9_964=l9_973;
l9_969=l9_964;
}
else
{
l9_969=l9_965;
}
}
l9_961=l9_969;
l9_958=l9_961;
l9_960=l9_958;
}
else
{
l9_960=l9_959;
}
}
l9_956=l9_960;
float l9_981=0.0;
l9_981=l9_955+l9_956;
float l9_982=0.0;
l9_982=l9_934+l9_981;
float l9_983=0.0;
float l9_984=(*sc_set0.UserUniforms).shapeHeightY;
l9_983=l9_984;
float l9_985=0.0;
l9_985=l9_983;
float l9_986=0.0;
float l9_987=0.0;
float l9_988=(*sc_set0.UserUniforms).Port_Value0_N289;
float l9_989=0.0;
float l9_990=(*sc_set0.UserUniforms).Port_Default_N289;
float l9_991=0.0;
float l9_992=float((*sc_set0.UserUniforms).yUpPin!=0);
l9_991=l9_992;
float l9_993=0.0;
l9_993=l9_991;
l9_987=l9_993;
l9_987=floor(l9_987);
float l9_994;
if (l9_987==0.0)
{
l9_994=l9_988;
}
else
{
if (l9_987==1.0)
{
float l9_995=0.0;
float l9_996=0.0;
float l9_997=0.0;
float l9_998=(*sc_set0.UserUniforms).Port_Default_N297;
float l9_999;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_1000=0.0;
float l9_1001=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_1002=l9_1001+0.001;
l9_1002-=0.001;
l9_1000=l9_1002;
l9_996=l9_1000;
l9_999=l9_996;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1003=0.0;
float l9_1004=(*sc_set0.UserUniforms).strokeThickness;
l9_1003=l9_1004;
float l9_1005=0.0;
l9_1005=l9_1003;
float l9_1006=0.0;
float l9_1007=l9_1005;
float l9_1008=(*sc_set0.UserUniforms).Port_RangeMinA_N299;
float l9_1009=(*sc_set0.UserUniforms).Port_RangeMaxA_N299;
float l9_1010=(*sc_set0.UserUniforms).Port_RangeMinB_N299;
float l9_1011=(*sc_set0.UserUniforms).Port_RangeMaxB_N299;
float l9_1012=(((l9_1007-l9_1008)/((l9_1009-l9_1008)+1e-06))*(l9_1011-l9_1010))+l9_1010;
float l9_1013;
if (l9_1011>l9_1010)
{
l9_1013=fast::clamp(l9_1012,l9_1010,l9_1011);
}
else
{
l9_1013=fast::clamp(l9_1012,l9_1011,l9_1010);
}
l9_1012=l9_1013;
l9_1006=l9_1012;
l9_997=l9_1006;
l9_999=l9_997;
}
else
{
l9_999=l9_998;
}
}
l9_995=l9_999;
l9_989=l9_995;
l9_994=l9_989;
}
else
{
l9_994=l9_990;
}
}
l9_986=l9_994;
float l9_1014=0.0;
float l9_1015=0.0;
float l9_1016=(*sc_set0.UserUniforms).Port_Value0_N286;
float l9_1017=0.0;
float l9_1018=(*sc_set0.UserUniforms).Port_Default_N286;
float l9_1019=0.0;
float l9_1020=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_1019=l9_1020;
float l9_1021=0.0;
l9_1021=l9_1019;
l9_1015=l9_1021;
l9_1015=floor(l9_1015);
float l9_1022;
if (l9_1015==0.0)
{
l9_1022=l9_1016;
}
else
{
if (l9_1015==1.0)
{
float l9_1023=0.0;
float l9_1024=0.0;
float l9_1025=0.0;
float l9_1026=(*sc_set0.UserUniforms).Port_Default_N298;
float l9_1027;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_1028=0.0;
float l9_1029=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_1030=l9_1029+0.001;
l9_1030-=0.001;
l9_1028=l9_1030;
l9_1024=l9_1028;
l9_1027=l9_1024;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1031=0.0;
float l9_1032=(*sc_set0.UserUniforms).strokeThickness;
l9_1031=l9_1032;
float l9_1033=0.0;
l9_1033=l9_1031;
float l9_1034=0.0;
float l9_1035=l9_1033;
float l9_1036=(*sc_set0.UserUniforms).Port_RangeMinA_N300;
float l9_1037=(*sc_set0.UserUniforms).Port_RangeMaxA_N300;
float l9_1038=(*sc_set0.UserUniforms).Port_RangeMinB_N300;
float l9_1039=(*sc_set0.UserUniforms).Port_RangeMaxB_N300;
float l9_1040=(((l9_1035-l9_1036)/((l9_1037-l9_1036)+1e-06))*(l9_1039-l9_1038))+l9_1038;
float l9_1041;
if (l9_1039>l9_1038)
{
l9_1041=fast::clamp(l9_1040,l9_1038,l9_1039);
}
else
{
l9_1041=fast::clamp(l9_1040,l9_1039,l9_1038);
}
l9_1040=l9_1041;
l9_1034=l9_1040;
l9_1025=l9_1034;
l9_1027=l9_1025;
}
else
{
l9_1027=l9_1026;
}
}
l9_1023=l9_1027;
l9_1017=l9_1023;
l9_1022=l9_1017;
}
else
{
l9_1022=l9_1018;
}
}
l9_1014=l9_1022;
float l9_1042=0.0;
float l9_1043=l9_985;
float l9_1044=(*sc_set0.UserUniforms).Port_RangeMinA_N277;
float l9_1045=(*sc_set0.UserUniforms).Port_RangeMaxA_N277;
float l9_1046=l9_986;
float l9_1047=l9_1014;
float l9_1048=(((l9_1043-l9_1044)/((l9_1045-l9_1044)+1e-06))*(l9_1047-l9_1046))+l9_1046;
float l9_1049;
if (l9_1047>l9_1046)
{
l9_1049=fast::clamp(l9_1048,l9_1046,l9_1047);
}
else
{
l9_1049=fast::clamp(l9_1048,l9_1047,l9_1046);
}
l9_1048=l9_1049;
l9_1042=l9_1048;
float l9_1050=0.0;
float l9_1051=(*sc_set0.UserUniforms).yOffset;
l9_1050=l9_1051;
float l9_1052=0.0;
l9_1052=l9_1050;
float l9_1053=0.0;
float l9_1054=0.0;
float l9_1055=(*sc_set0.UserUniforms).Port_Value0_N293;
float l9_1056=(*sc_set0.UserUniforms).Port_Value1_N293;
float l9_1057=(*sc_set0.UserUniforms).Port_Default_N293;
float l9_1058=0.0;
float l9_1059=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_1058=l9_1059;
float l9_1060=0.0;
l9_1060=l9_1058;
l9_1054=l9_1060;
l9_1054=floor(l9_1054);
float l9_1061;
if (l9_1054==0.0)
{
l9_1061=l9_1055;
}
else
{
if (l9_1054==1.0)
{
l9_1061=l9_1056;
}
else
{
l9_1061=l9_1057;
}
}
l9_1053=l9_1061;
float l9_1062=0.0;
l9_1062=l9_1052+l9_1053;
float l9_1063=0.0;
float l9_1064=(*sc_set0.UserUniforms).Port_Value0_N301;
float l9_1065=0.0;
float l9_1066=(*sc_set0.UserUniforms).Port_Default_N301;
float l9_1067;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_1067=l9_1064;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1068=0.0;
float l9_1069=0.0;
float l9_1070=(*sc_set0.UserUniforms).Port_Value0_N306;
float l9_1071=0.0;
float l9_1072=(*sc_set0.UserUniforms).Port_Default_N306;
float l9_1073=0.0;
float l9_1074=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_1073=l9_1074;
float l9_1075=0.0;
l9_1075=l9_1073;
l9_1069=l9_1075;
l9_1069=floor(l9_1069);
float l9_1076;
if (l9_1069==0.0)
{
l9_1076=l9_1070;
}
else
{
if (l9_1069==1.0)
{
float l9_1077=0.0;
float l9_1078=(*sc_set0.UserUniforms).strokeThickness;
l9_1077=l9_1078;
float l9_1079=0.0;
l9_1079=l9_1077;
float l9_1080=0.0;
float l9_1081=l9_1079;
float l9_1082=(*sc_set0.UserUniforms).Port_RangeMinA_N305;
float l9_1083=(*sc_set0.UserUniforms).Port_RangeMaxA_N305;
float l9_1084=(*sc_set0.UserUniforms).Port_RangeMinB_N305;
float l9_1085=(*sc_set0.UserUniforms).Port_RangeMaxB_N305;
float l9_1086=(((l9_1081-l9_1082)/((l9_1083-l9_1082)+1e-06))*(l9_1085-l9_1084))+l9_1084;
float l9_1087;
if (l9_1085>l9_1084)
{
l9_1087=fast::clamp(l9_1086,l9_1084,l9_1085);
}
else
{
l9_1087=fast::clamp(l9_1086,l9_1085,l9_1084);
}
l9_1086=l9_1087;
l9_1080=l9_1086;
l9_1071=l9_1080;
l9_1076=l9_1071;
}
else
{
l9_1076=l9_1072;
}
}
l9_1068=l9_1076;
l9_1065=l9_1068;
l9_1067=l9_1065;
}
else
{
l9_1067=l9_1066;
}
}
l9_1063=l9_1067;
float l9_1088=0.0;
l9_1088=l9_1062+l9_1063;
float l9_1089=0.0;
l9_1089=l9_1042+l9_1088;
float2 l9_1090=float2(0.0);
l9_1090.x=l9_982;
l9_1090.y=l9_1089;
float2 l9_1091=float2(0.0);
l9_1091=l9_1090;
float2 l9_1092=float2(0.0);
l9_1092=l9_874+l9_1091;
float l9_1093=0.0;
float l9_1094=(*sc_set0.UserUniforms).Port_Value0_N132;
float l9_1095=0.0;
float l9_1096=(*sc_set0.UserUniforms).Port_Default_N132;
float l9_1097;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_1097=l9_1094;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_1098=0.0;
float l9_1099=(*sc_set0.UserUniforms).shadowRotation;
l9_1098=l9_1099;
float l9_1100=0.0;
l9_1100=l9_1098+(*sc_set0.UserUniforms).Port_Input1_N141;
l9_1095=l9_1100;
l9_1097=l9_1095;
}
else
{
l9_1097=l9_1096;
}
}
l9_1093=l9_1097;
float2 l9_1101=float2(0.0);
float2 l9_1102=l9_1092;
float l9_1103=l9_1093;
float2 l9_1104=(*sc_set0.UserUniforms).Port_Center_N092;
float l9_1105=sin(radians(l9_1103));
float l9_1106=cos(radians(l9_1103));
float2 l9_1107=l9_1102-l9_1104;
l9_1107=float2(dot(float2(l9_1106,l9_1105),l9_1107),dot(float2(-l9_1105,l9_1106),l9_1107))+l9_1104;
l9_1101=l9_1107;
float l9_1108=0.0;
float l9_1109=(*sc_set0.UserUniforms).Port_Value0_N131;
float l9_1110=0.0;
float l9_1111=(*sc_set0.UserUniforms).Port_Default_N131;
float l9_1112;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_1112=l9_1109;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_1113=0.0;
float l9_1114=(*sc_set0.UserUniforms).shadowDistance;
l9_1113=l9_1114;
l9_1110=l9_1113;
l9_1112=l9_1110;
}
else
{
l9_1112=l9_1111;
}
}
l9_1108=l9_1112;
float l9_1115=0.0;
l9_1115=l9_1108/(*sc_set0.UserUniforms).Port_Input1_N160;
float2 l9_1116=float2(0.0);
l9_1116.x=(*sc_set0.UserUniforms).Port_Value1_N097;
l9_1116.y=l9_1115;
float2 l9_1117=float2(0.0);
l9_1117=l9_1101+l9_1116;
float l9_1118=0.0;
l9_1118=l9_1093+(*sc_set0.UserUniforms).Port_Input1_N263;
float l9_1119=0.0;
l9_1119=1.0-l9_1118;
float2 l9_1120=float2(0.0);
float2 l9_1121=l9_1117;
float l9_1122=l9_1119;
float2 l9_1123=(*sc_set0.UserUniforms).Port_Center_N094;
float l9_1124=sin(radians(l9_1122));
float l9_1125=cos(radians(l9_1122));
float2 l9_1126=l9_1121-l9_1123;
l9_1126=float2(dot(float2(l9_1125,l9_1124),l9_1126),dot(float2(-l9_1124,l9_1125),l9_1126))+l9_1123;
l9_1120=l9_1126;
float l9_1127=0.0;
float l9_1128=(*sc_set0.UserUniforms).shapeRotation;
l9_1127=l9_1128;
float2 l9_1129=float2(0.0);
float2 l9_1130=l9_1120;
float l9_1131=l9_1127;
float2 l9_1132=(*sc_set0.UserUniforms).Port_Center_N100;
float l9_1133=sin(radians(l9_1131));
float l9_1134=cos(radians(l9_1131));
float2 l9_1135=l9_1130-l9_1132;
l9_1135=float2(dot(float2(l9_1134,l9_1133),l9_1135),dot(float2(-l9_1133,l9_1134),l9_1135))+l9_1132;
l9_1129=l9_1135;
float l9_1136=0.0;
float l9_1137=(*sc_set0.UserUniforms).Port_Value0_N125;
float l9_1138=0.0;
float l9_1139=(*sc_set0.UserUniforms).Port_Default_N125;
float l9_1140;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_1140=l9_1137;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_1141=0.0;
float l9_1142=(*sc_set0.UserUniforms).shadowBlur;
l9_1141=l9_1142;
l9_1138=l9_1141;
l9_1140=l9_1138;
}
else
{
l9_1140=l9_1139;
}
}
l9_1136=l9_1140;
float l9_1143=0.0;
float l9_1144=l9_1136;
float l9_1145=(*sc_set0.UserUniforms).Port_RangeMinA_N138;
float l9_1146=(*sc_set0.UserUniforms).Port_RangeMaxA_N138;
float l9_1147=(*sc_set0.UserUniforms).Port_RangeMinB_N138;
float l9_1148=(*sc_set0.UserUniforms).Port_RangeMaxB_N138;
float l9_1149=(((l9_1144-l9_1145)/((l9_1146-l9_1145)+1e-06))*(l9_1148-l9_1147))+l9_1147;
float l9_1150;
if (l9_1148>l9_1147)
{
l9_1150=fast::clamp(l9_1149,l9_1147,l9_1148);
}
else
{
l9_1150=fast::clamp(l9_1149,l9_1148,l9_1147);
}
l9_1149=l9_1150;
l9_1143=l9_1149;
float2 l9_1151=float2(0.0);
l9_1151=((l9_1129-(*sc_set0.UserUniforms).Port_Center_N137)*float2(l9_1143))+(*sc_set0.UserUniforms).Port_Center_N137;
float2 l9_1152=float2(0.0);
l9_1152=l9_1151*float2((*sc_set0.UserUniforms).Port_Input1_N019);
float2 l9_1153=float2(0.0);
l9_1153=l9_1152+float2((*sc_set0.UserUniforms).Port_Input1_N020);
float2 l9_1154=float2(0.0);
l9_1154=abs(l9_1153);
float l9_1155=0.0;
float l9_1156=(*sc_set0.UserUniforms).Port_Value0_N122;
float l9_1157=0.0;
float l9_1158=(*sc_set0.UserUniforms).Port_Default_N122;
float l9_1159;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_1159=l9_1156;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1160=0.0;
float l9_1161=(*sc_set0.UserUniforms).strokeThickness;
l9_1160=l9_1161;
l9_1157=l9_1160;
l9_1159=l9_1157;
}
else
{
l9_1159=l9_1158;
}
}
l9_1155=l9_1159;
float l9_1162=0.0;
l9_1162=l9_1155/(*sc_set0.UserUniforms).Port_Input1_N056;
float l9_1163=0.0;
l9_1163=1.0-l9_1162;
float l9_1164=0.0;
float l9_1165=l9_875;
float l9_1166=(*sc_set0.UserUniforms).Port_RangeMinA_N021;
float l9_1167=(*sc_set0.UserUniforms).Port_RangeMaxA_N021;
float l9_1168=(*sc_set0.UserUniforms).Port_RangeMinB_N021;
float l9_1169=l9_1163;
float l9_1170=(((l9_1165-l9_1166)/((l9_1167-l9_1166)+1e-06))*(l9_1169-l9_1168))+l9_1168;
float l9_1171;
if (l9_1169>l9_1168)
{
l9_1171=fast::clamp(l9_1170,l9_1168,l9_1169);
}
else
{
l9_1171=fast::clamp(l9_1170,l9_1169,l9_1168);
}
l9_1170=l9_1171;
l9_1164=l9_1170;
float l9_1172=0.0;
l9_1172=1.0-l9_1162;
float l9_1173=0.0;
float l9_1174=l9_983;
float l9_1175=(*sc_set0.UserUniforms).Port_RangeMinA_N022;
float l9_1176=(*sc_set0.UserUniforms).Port_RangeMaxA_N022;
float l9_1177=(*sc_set0.UserUniforms).Port_RangeMinB_N022;
float l9_1178=l9_1172;
float l9_1179=(((l9_1174-l9_1175)/((l9_1176-l9_1175)+1e-06))*(l9_1178-l9_1177))+l9_1177;
float l9_1180;
if (l9_1178>l9_1177)
{
l9_1180=fast::clamp(l9_1179,l9_1177,l9_1178);
}
else
{
l9_1180=fast::clamp(l9_1179,l9_1178,l9_1177);
}
l9_1179=l9_1180;
l9_1173=l9_1179;
float2 l9_1181=float2(0.0);
l9_1181.x=l9_1164;
l9_1181.y=l9_1173;
float2 l9_1182=float2(0.0);
l9_1182=l9_1154-l9_1181;
float l9_1183=0.0;
float l9_1184=(*sc_set0.UserUniforms).shapeRoundness;
l9_1183=l9_1184;
float l9_1185=0.0;
l9_1185=abs(l9_1183);
float l9_1186=0.0;
l9_1186=fast::min(l9_1185,l9_1164);
float l9_1187=0.0;
l9_1187=fast::min(l9_1186,l9_1173);
float l9_1188=0.0;
l9_1188=fast::max(l9_1187,(*sc_set0.UserUniforms).Port_Input1_N030);
float2 l9_1189=float2(0.0);
l9_1189=l9_1182+float2(l9_1188);
float2 l9_1190=float2(0.0);
l9_1190=fast::max(l9_1189,(*sc_set0.UserUniforms).Port_Input1_N032);
float l9_1191=0.0;
l9_1191=length(l9_1190);
float l9_1192=0.0;
l9_1192=l9_1191/l9_1188;
float l9_1193=0.0;
l9_1193=1.0-l9_1192;
float l9_1194=0.0;
float l9_1195=l9_1193;
float l9_1196=fwidth(l9_1195);
l9_1194=l9_1196;
float l9_1197=0.0;
l9_1197=l9_1136*(*sc_set0.UserUniforms).Port_Input1_N127;
float l9_1198=0.0;
l9_1198=(((l9_1194-(*sc_set0.UserUniforms).Port_RangeMinA_N135)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N135-(*sc_set0.UserUniforms).Port_RangeMinA_N135)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N135-l9_1197))+l9_1197;
float l9_1199=0.0;
l9_1199=l9_1193/l9_1198;
float l9_1200=0.0;
l9_1200=fast::clamp(l9_1199+0.001,(*sc_set0.UserUniforms).Port_Input1_N038+0.001,(*sc_set0.UserUniforms).Port_Input2_N038+0.001)-0.001;
float l9_1201=0.0;
l9_1201=l9_863*l9_1200;
float l9_1202=0.0;
l9_1202=1.0-l9_1199;
float l9_1203=0.0;
l9_1203=fast::clamp(l9_1202+0.001,(*sc_set0.UserUniforms).Port_Input1_N264+0.001,(*sc_set0.UserUniforms).Port_Input2_N264+0.001)-0.001;
float l9_1204=0.0;
float l9_1205=l9_875;
float l9_1206=(*sc_set0.UserUniforms).Port_RangeMinA_N039;
float l9_1207=(*sc_set0.UserUniforms).Port_RangeMaxA_N039;
float l9_1208=l9_1162;
float l9_1209=(*sc_set0.UserUniforms).Port_RangeMaxB_N039;
float l9_1210=(((l9_1205-l9_1206)/((l9_1207-l9_1206)+1e-06))*(l9_1209-l9_1208))+l9_1208;
float l9_1211;
if (l9_1209>l9_1208)
{
l9_1211=fast::clamp(l9_1210,l9_1208,l9_1209);
}
else
{
l9_1211=fast::clamp(l9_1210,l9_1209,l9_1208);
}
l9_1210=l9_1211;
l9_1204=l9_1210;
float l9_1212=0.0;
float l9_1213=l9_983;
float l9_1214=(*sc_set0.UserUniforms).Port_RangeMinA_N042;
float l9_1215=(*sc_set0.UserUniforms).Port_RangeMaxA_N042;
float l9_1216=l9_1162;
float l9_1217=(*sc_set0.UserUniforms).Port_RangeMaxB_N042;
float l9_1218=(((l9_1213-l9_1214)/((l9_1215-l9_1214)+1e-06))*(l9_1217-l9_1216))+l9_1216;
float l9_1219;
if (l9_1217>l9_1216)
{
l9_1219=fast::clamp(l9_1218,l9_1216,l9_1217);
}
else
{
l9_1219=fast::clamp(l9_1218,l9_1217,l9_1216);
}
l9_1218=l9_1219;
l9_1212=l9_1218;
float2 l9_1220=float2(0.0);
l9_1220.x=l9_1204;
l9_1220.y=l9_1212;
float2 l9_1221=float2(0.0);
l9_1221=l9_1154-l9_1220;
float l9_1222=0.0;
float l9_1223=l9_1183;
float l9_1224=(*sc_set0.UserUniforms).Port_RangeMinA_N057;
float l9_1225=(*sc_set0.UserUniforms).Port_RangeMaxA_N057;
float l9_1226=(*sc_set0.UserUniforms).Port_RangeMinB_N057;
float l9_1227=(*sc_set0.UserUniforms).Port_RangeMaxB_N057;
float l9_1228=(((l9_1223-l9_1224)/((l9_1225-l9_1224)+1e-06))*(l9_1227-l9_1226))+l9_1226;
float l9_1229;
if (l9_1227>l9_1226)
{
l9_1229=fast::clamp(l9_1228,l9_1226,l9_1227);
}
else
{
l9_1229=fast::clamp(l9_1228,l9_1227,l9_1226);
}
l9_1228=l9_1229;
l9_1222=l9_1228;
float l9_1230=0.0;
l9_1230=(((l9_1155-(*sc_set0.UserUniforms).Port_RangeMinA_N101)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N101-(*sc_set0.UserUniforms).Port_RangeMinA_N101)+1e-06))*(l9_1222-(*sc_set0.UserUniforms).Port_RangeMinB_N101))+(*sc_set0.UserUniforms).Port_RangeMinB_N101;
float l9_1231=0.0;
float l9_1232=l9_1183;
float l9_1233=(*sc_set0.UserUniforms).Port_RangeMinA_N047;
float l9_1234=(*sc_set0.UserUniforms).Port_RangeMaxA_N047;
float l9_1235=l9_1230;
float l9_1236=(*sc_set0.UserUniforms).Port_RangeMaxB_N047;
float l9_1237=(((l9_1232-l9_1233)/((l9_1234-l9_1233)+1e-06))*(l9_1236-l9_1235))+l9_1235;
float l9_1238;
if (l9_1236>l9_1235)
{
l9_1238=fast::clamp(l9_1237,l9_1235,l9_1236);
}
else
{
l9_1238=fast::clamp(l9_1237,l9_1236,l9_1235);
}
l9_1237=l9_1238;
l9_1231=l9_1237;
float l9_1239=0.0;
l9_1239=abs(l9_1231);
float l9_1240=0.0;
l9_1240=fast::min(l9_1239,l9_1204);
float l9_1241=0.0;
l9_1241=fast::min(l9_1240,l9_1212);
float l9_1242=0.0;
l9_1242=fast::max(l9_1241,(*sc_set0.UserUniforms).Port_Input1_N051);
float2 l9_1243=float2(0.0);
l9_1243=l9_1221+float2(l9_1242);
float2 l9_1244=float2(0.0);
l9_1244=fast::max(l9_1243,(*sc_set0.UserUniforms).Port_Input1_N053);
float l9_1245=0.0;
l9_1245=length(l9_1244);
float l9_1246=0.0;
l9_1246=l9_1245/l9_1242;
float l9_1247=0.0;
l9_1247=1.0-l9_1246;
float l9_1248=0.0;
float l9_1249=l9_1247;
float l9_1250=fwidth(l9_1249);
l9_1248=l9_1250;
float l9_1251=0.0;
l9_1251=(((l9_1248-(*sc_set0.UserUniforms).Port_RangeMinA_N133)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N133-(*sc_set0.UserUniforms).Port_RangeMinA_N133)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N133-l9_1136))+l9_1136;
float l9_1252=0.0;
l9_1252=l9_1247/l9_1251;
float l9_1253=0.0;
l9_1253=fast::clamp(l9_1252+0.001,(*sc_set0.UserUniforms).Port_Input1_N064+0.001,(*sc_set0.UserUniforms).Port_Input2_N064+0.001)-0.001;
float l9_1254=0.0;
l9_1254=l9_1203*l9_1253;
float l9_1255=0.0;
l9_1255=fast::clamp(l9_1254+0.001,(*sc_set0.UserUniforms).Port_Input1_N066+0.001,(*sc_set0.UserUniforms).Port_Input2_N066+0.001)-0.001;
float l9_1256=0.0;
float l9_1257=(*sc_set0.UserUniforms).Port_Value0_N068;
float l9_1258=0.0;
float l9_1259=(*sc_set0.UserUniforms).Port_Default_N068;
float l9_1260;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_1260=l9_1257;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1261=0.0;
float l9_1262=(*sc_set0.UserUniforms).strokeAlpha;
l9_1261=l9_1262;
l9_1258=l9_1261;
l9_1260=l9_1258;
}
else
{
l9_1260=l9_1259;
}
}
l9_1256=l9_1260;
float l9_1263=0.0;
l9_1263=l9_1255*l9_1256;
float l9_1264=0.0;
l9_1264=l9_1201+l9_1263;
float l9_1265=0.0;
l9_1265=fast::clamp(l9_1264+0.001,(*sc_set0.UserUniforms).Port_Input1_N072+0.001,(*sc_set0.UserUniforms).Port_Input2_N072+0.001)-0.001;
float l9_1266=0.0;
float l9_1267=(*sc_set0.UserUniforms).Port_Value0_N123;
float l9_1268=0.0;
float l9_1269=(*sc_set0.UserUniforms).Port_Default_N123;
float l9_1270;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_1270=l9_1267;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_1271=0.0;
float l9_1272=(*sc_set0.UserUniforms).shadowAlpha;
l9_1271=l9_1272;
l9_1268=l9_1271;
l9_1270=l9_1268;
}
else
{
l9_1270=l9_1269;
}
}
l9_1266=l9_1270;
float l9_1273=0.0;
l9_1273=l9_1265*l9_1266;
float4 l9_1274=float4(0.0);
l9_1274=float4(l9_853.xyz.x,l9_853.xyz.y,l9_853.xyz.z,l9_1274.w);
l9_1274.w=l9_1273;
float l9_1275=0.0;
l9_1275=l9_1274.w;
float l9_1276=0.0;
float l9_1277;
if ((int(Tweak_N124_tmp)!=0))
{
l9_1277=1.001;
}
else
{
l9_1277=0.001;
}
l9_1277-=0.001;
l9_1276=l9_1277;
float l9_1278=0.0;
l9_1278=l9_1275*l9_1276;
float4 l9_1279=float4(0.0);
l9_1279=float4(l9_1274.xyz.x,l9_1274.xyz.y,l9_1274.xyz.z,l9_1279.w);
l9_1279.w=l9_1278;
float l9_1280=0.0;
float l9_1281;
if ((int(innerCutout_tmp)!=0))
{
l9_1281=1.001;
}
else
{
l9_1281=0.001;
}
l9_1281-=0.001;
l9_1280=l9_1281;
float2 l9_1282=float2(0.0);
float2 l9_1283=l9_1092;
float l9_1284=l9_1127;
float2 l9_1285=(*sc_set0.UserUniforms).Port_Center_N113;
float l9_1286=sin(radians(l9_1284));
float l9_1287=cos(radians(l9_1284));
float2 l9_1288=l9_1283-l9_1285;
l9_1288=float2(dot(float2(l9_1287,l9_1286),l9_1288),dot(float2(-l9_1286,l9_1287),l9_1288))+l9_1285;
l9_1282=l9_1288;
float2 l9_1289=float2(0.0);
l9_1289=l9_1282*float2((*sc_set0.UserUniforms).Port_Input1_N089);
float2 l9_1290=float2(0.0);
l9_1290=l9_1289+float2((*sc_set0.UserUniforms).Port_Input1_N090);
float2 l9_1291=float2(0.0);
l9_1291=abs(l9_1290);
float2 l9_1292=float2(0.0);
l9_1292.x=l9_1164;
l9_1292.y=l9_1173;
float2 l9_1293=float2(0.0);
l9_1293=l9_1291-l9_1292;
float l9_1294=0.0;
l9_1294=abs(l9_1183);
float l9_1295=0.0;
l9_1295=fast::min(l9_1294,l9_1164);
float l9_1296=0.0;
l9_1296=fast::min(l9_1295,l9_1173);
float l9_1297=0.0;
l9_1297=fast::max(l9_1296,(*sc_set0.UserUniforms).Port_Input1_N103);
float2 l9_1298=float2(0.0);
l9_1298=l9_1293+float2(l9_1297);
float2 l9_1299=float2(0.0);
l9_1299=fast::max(l9_1298,(*sc_set0.UserUniforms).Port_Input1_N105);
float l9_1300=0.0;
l9_1300=length(l9_1299);
float l9_1301=0.0;
l9_1301=l9_1300/l9_1297;
float l9_1302=0.0;
l9_1302=1.0-l9_1301;
float l9_1303=0.0;
float l9_1304=l9_1302;
float l9_1305=fwidth(l9_1304);
l9_1303=l9_1305;
float l9_1306=0.0;
l9_1306=l9_1302/l9_1303;
float l9_1307=0.0;
l9_1307=fast::clamp(l9_1306+0.001,(*sc_set0.UserUniforms).Port_Input1_N112+0.001,(*sc_set0.UserUniforms).Port_Input2_N112+0.001)-0.001;
float l9_1308=0.0;
l9_1308=l9_1280*l9_1307;
float4 l9_1309=float4(0.0);
l9_1309=mix(l9_1279,float4((*sc_set0.UserUniforms).Port_Input1_N259),float4(l9_1308));
float4 l9_1310=float4(0.0);
float4 l9_1311=float4(0.0);
float4 l9_1312=float4(0.0);
float4 l9_1313=float4(0.0);
float4 l9_1314=(*sc_set0.UserUniforms).Port_Default_N149;
ssGlobals l9_1315=l9_10;
float4 l9_1316;
if (NODE_161_DROPLIST_ITEM_tmp==0)
{
float4 l9_1317=float4(0.0);
float4 l9_1318=(*sc_set0.UserUniforms).shapeColor;
l9_1317=l9_1318;
float4 l9_1319=float4(0.0);
l9_1319=float4(l9_1317.x,l9_1317.y,l9_1317.z,1.0);
l9_1311=l9_1319;
l9_1316=l9_1311;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==1)
{
float2 l9_1320=float2(0.0);
l9_1320=l9_1315.Surface_UVCoord0;
float2 l9_1321=float2(0.0);
float2 l9_1322=(*sc_set0.UserUniforms).shapeScale;
l9_1321=l9_1322;
float2 l9_1323=float2(0.0);
float2 l9_1324=(*sc_set0.UserUniforms).shapeOffset;
l9_1323=l9_1324;
float2 l9_1325=float2(0.0);
l9_1325=(l9_1320*l9_1321)+l9_1323;
float4 l9_1326=float4(0.0);
int l9_1327;
if ((int(shapeTextureHasSwappedViews_tmp)!=0))
{
int l9_1328=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1328=0;
}
else
{
l9_1328=in.varStereoViewID;
}
int l9_1329=l9_1328;
l9_1327=1-l9_1329;
}
else
{
int l9_1330=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1330=0;
}
else
{
l9_1330=in.varStereoViewID;
}
int l9_1331=l9_1330;
l9_1327=l9_1331;
}
int l9_1332=l9_1327;
int l9_1333=shapeTextureLayout_tmp;
int l9_1334=l9_1332;
float2 l9_1335=l9_1325;
bool l9_1336=(int(SC_USE_UV_TRANSFORM_shapeTexture_tmp)!=0);
float3x3 l9_1337=(*sc_set0.UserUniforms).shapeTextureTransform;
int2 l9_1338=int2(SC_SOFTWARE_WRAP_MODE_U_shapeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_shapeTexture_tmp);
bool l9_1339=(int(SC_USE_UV_MIN_MAX_shapeTexture_tmp)!=0);
float4 l9_1340=(*sc_set0.UserUniforms).shapeTextureUvMinMax;
bool l9_1341=(int(SC_USE_CLAMP_TO_BORDER_shapeTexture_tmp)!=0);
float4 l9_1342=(*sc_set0.UserUniforms).shapeTextureBorderColor;
float l9_1343=0.0;
bool l9_1344=l9_1341&&(!l9_1339);
float l9_1345=1.0;
float l9_1346=l9_1335.x;
int l9_1347=l9_1338.x;
if (l9_1347==1)
{
l9_1346=fract(l9_1346);
}
else
{
if (l9_1347==2)
{
float l9_1348=fract(l9_1346);
float l9_1349=l9_1346-l9_1348;
float l9_1350=step(0.25,fract(l9_1349*0.5));
l9_1346=mix(l9_1348,1.0-l9_1348,fast::clamp(l9_1350,0.0,1.0));
}
}
l9_1335.x=l9_1346;
float l9_1351=l9_1335.y;
int l9_1352=l9_1338.y;
if (l9_1352==1)
{
l9_1351=fract(l9_1351);
}
else
{
if (l9_1352==2)
{
float l9_1353=fract(l9_1351);
float l9_1354=l9_1351-l9_1353;
float l9_1355=step(0.25,fract(l9_1354*0.5));
l9_1351=mix(l9_1353,1.0-l9_1353,fast::clamp(l9_1355,0.0,1.0));
}
}
l9_1335.y=l9_1351;
if (l9_1339)
{
bool l9_1356=l9_1341;
bool l9_1357;
if (l9_1356)
{
l9_1357=l9_1338.x==3;
}
else
{
l9_1357=l9_1356;
}
float l9_1358=l9_1335.x;
float l9_1359=l9_1340.x;
float l9_1360=l9_1340.z;
bool l9_1361=l9_1357;
float l9_1362=l9_1345;
float l9_1363=fast::clamp(l9_1358,l9_1359,l9_1360);
float l9_1364=step(abs(l9_1358-l9_1363),9.9999997e-06);
l9_1362*=(l9_1364+((1.0-float(l9_1361))*(1.0-l9_1364)));
l9_1358=l9_1363;
l9_1335.x=l9_1358;
l9_1345=l9_1362;
bool l9_1365=l9_1341;
bool l9_1366;
if (l9_1365)
{
l9_1366=l9_1338.y==3;
}
else
{
l9_1366=l9_1365;
}
float l9_1367=l9_1335.y;
float l9_1368=l9_1340.y;
float l9_1369=l9_1340.w;
bool l9_1370=l9_1366;
float l9_1371=l9_1345;
float l9_1372=fast::clamp(l9_1367,l9_1368,l9_1369);
float l9_1373=step(abs(l9_1367-l9_1372),9.9999997e-06);
l9_1371*=(l9_1373+((1.0-float(l9_1370))*(1.0-l9_1373)));
l9_1367=l9_1372;
l9_1335.y=l9_1367;
l9_1345=l9_1371;
}
float2 l9_1374=l9_1335;
bool l9_1375=l9_1336;
float3x3 l9_1376=l9_1337;
if (l9_1375)
{
l9_1374=float2((l9_1376*float3(l9_1374,1.0)).xy);
}
float2 l9_1377=l9_1374;
l9_1335=l9_1377;
float l9_1378=l9_1335.x;
int l9_1379=l9_1338.x;
bool l9_1380=l9_1344;
float l9_1381=l9_1345;
if ((l9_1379==0)||(l9_1379==3))
{
float l9_1382=l9_1378;
float l9_1383=0.0;
float l9_1384=1.0;
bool l9_1385=l9_1380;
float l9_1386=l9_1381;
float l9_1387=fast::clamp(l9_1382,l9_1383,l9_1384);
float l9_1388=step(abs(l9_1382-l9_1387),9.9999997e-06);
l9_1386*=(l9_1388+((1.0-float(l9_1385))*(1.0-l9_1388)));
l9_1382=l9_1387;
l9_1378=l9_1382;
l9_1381=l9_1386;
}
l9_1335.x=l9_1378;
l9_1345=l9_1381;
float l9_1389=l9_1335.y;
int l9_1390=l9_1338.y;
bool l9_1391=l9_1344;
float l9_1392=l9_1345;
if ((l9_1390==0)||(l9_1390==3))
{
float l9_1393=l9_1389;
float l9_1394=0.0;
float l9_1395=1.0;
bool l9_1396=l9_1391;
float l9_1397=l9_1392;
float l9_1398=fast::clamp(l9_1393,l9_1394,l9_1395);
float l9_1399=step(abs(l9_1393-l9_1398),9.9999997e-06);
l9_1397*=(l9_1399+((1.0-float(l9_1396))*(1.0-l9_1399)));
l9_1393=l9_1398;
l9_1389=l9_1393;
l9_1392=l9_1397;
}
l9_1335.y=l9_1389;
l9_1345=l9_1392;
float2 l9_1400=l9_1335;
int l9_1401=l9_1333;
int l9_1402=l9_1334;
float l9_1403=l9_1343;
float2 l9_1404=l9_1400;
int l9_1405=l9_1401;
int l9_1406=l9_1402;
float3 l9_1407=float3(0.0);
if (l9_1405==0)
{
l9_1407=float3(l9_1404,0.0);
}
else
{
if (l9_1405==1)
{
l9_1407=float3(l9_1404.x,(l9_1404.y*0.5)+(0.5-(float(l9_1406)*0.5)),0.0);
}
else
{
l9_1407=float3(l9_1404,float(l9_1406));
}
}
float3 l9_1408=l9_1407;
float3 l9_1409=l9_1408;
float4 l9_1410=sc_set0.shapeTexture.sample(sc_set0.shapeTextureSmpSC,l9_1409.xy,bias(l9_1403));
float4 l9_1411=l9_1410;
if (l9_1341)
{
l9_1411=mix(l9_1342,l9_1411,float4(l9_1345));
}
float4 l9_1412=l9_1411;
l9_1326=l9_1412;
float4 l9_1413=float4(0.0);
float4 l9_1414=(*sc_set0.UserUniforms).shapeColor;
l9_1413=l9_1414;
float4 l9_1415=float4(0.0);
l9_1415=l9_1326*l9_1413;
l9_1312=l9_1415;
l9_1316=l9_1312;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==2)
{
float4 l9_1416=float4(0.0);
float4 l9_1417=float4(0.0);
float4 l9_1418=float4(0.0);
float4 l9_1419=(*sc_set0.UserUniforms).Port_Default_N209;
ssGlobals l9_1420=l9_1315;
float4 l9_1421;
if (int((int(toQuadShapeGrad_tmp)!=0))==0)
{
float4 l9_1422=float4(0.0);
float4 l9_1423=(*sc_set0.UserUniforms).shapeGradColorA;
l9_1422=l9_1423;
float4 l9_1424=float4(0.0);
l9_1424=l9_1422;
float4 l9_1425=float4(0.0);
float4 l9_1426=(*sc_set0.UserUniforms).shapeGradColorB;
l9_1425=l9_1426;
float4 l9_1427=float4(0.0);
l9_1427=l9_1425;
float2 l9_1428=float2(0.0);
l9_1428=l9_1420.Surface_UVCoord0;
float2 l9_1429=float2(0.0);
l9_1429=(((l9_1428-float2((*sc_set0.UserUniforms).Port_RangeMinA_N175))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N175-(*sc_set0.UserUniforms).Port_RangeMinA_N175)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N175-(*sc_set0.UserUniforms).Port_RangeMinB_N175))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N175);
float2 l9_1430=float2(0.0);
float2 l9_1431=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_1430=l9_1431;
float2 l9_1432=float2(0.0);
l9_1432=l9_1430;
float2 l9_1433=float2(0.0);
l9_1433=((l9_1429-(*sc_set0.UserUniforms).Port_Center_N177)*l9_1432)+(*sc_set0.UserUniforms).Port_Center_N177;
float2 l9_1434=float2(0.0);
float2 l9_1435=(*sc_set0.UserUniforms).shapeGradPointA;
l9_1434=l9_1435;
float2 l9_1436=float2(0.0);
l9_1436=l9_1434;
float2 l9_1437=float2(0.0);
l9_1437=l9_1433-l9_1436;
float2 l9_1438=float2(0.0);
float2 l9_1439=(*sc_set0.UserUniforms).shapeGradPointB;
l9_1438=l9_1439;
float2 l9_1440=float2(0.0);
l9_1440=l9_1438;
float2 l9_1441=float2(0.0);
l9_1441=l9_1440-l9_1436;
float l9_1442=0.0;
l9_1442=dot(l9_1437,l9_1441);
float l9_1443=0.0;
l9_1443=dot(l9_1441,l9_1441);
float l9_1444=0.0;
l9_1444=l9_1442/l9_1443;
float l9_1445=0.0;
l9_1445=fast::clamp(l9_1444+0.001,(*sc_set0.UserUniforms).Port_Input1_N185+0.001,(*sc_set0.UserUniforms).Port_Input2_N185+0.001)-0.001;
float l9_1446=0.0;
l9_1446=smoothstep((*sc_set0.UserUniforms).Port_Input0_N186,(*sc_set0.UserUniforms).Port_Input1_N186,l9_1445);
float4 l9_1447=float4(0.0);
l9_1447=mix(l9_1424,l9_1427,float4(l9_1446));
float4 l9_1448=float4(0.0);
l9_1448=l9_1447;
l9_1417=l9_1448;
l9_1421=l9_1417;
}
else
{
if (int((int(toQuadShapeGrad_tmp)!=0))==1)
{
float4 l9_1449=float4(0.0);
float4 l9_1450=(*sc_set0.UserUniforms).shapeGradColorA;
l9_1449=l9_1450;
float4 l9_1451=float4(0.0);
l9_1451=l9_1449;
float4 l9_1452=float4(0.0);
float4 l9_1453=(*sc_set0.UserUniforms).shapeGradColorB;
l9_1452=l9_1453;
float4 l9_1454=float4(0.0);
l9_1454=l9_1452;
float2 l9_1455=float2(0.0);
l9_1455=l9_1420.Surface_UVCoord0;
float2 l9_1456=float2(0.0);
l9_1456=(((l9_1455-float2((*sc_set0.UserUniforms).Port_RangeMinA_N198))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N198-(*sc_set0.UserUniforms).Port_RangeMinA_N198)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N198-(*sc_set0.UserUniforms).Port_RangeMinB_N198))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N198);
float2 l9_1457=float2(0.0);
float2 l9_1458=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_1457=l9_1458;
float2 l9_1459=float2(0.0);
l9_1459=l9_1457;
float2 l9_1460=float2(0.0);
float2 l9_1461=(*sc_set0.UserUniforms).shapeQuadOffset;
l9_1460=l9_1461;
float2 l9_1462=float2(0.0);
l9_1462=l9_1460;
float2 l9_1463=float2(0.0);
l9_1463=(l9_1456*l9_1459)+l9_1462;
float l9_1464=0.0;
float l9_1465=0.0;
float2 l9_1466=l9_1463;
float l9_1467=l9_1466.x;
float l9_1468=l9_1466.y;
l9_1464=l9_1467;
l9_1465=l9_1468;
float4 l9_1469=float4(0.0);
l9_1469=mix(l9_1451,l9_1454,float4(l9_1464));
float4 l9_1470=float4(0.0);
float4 l9_1471=(*sc_set0.UserUniforms).shapeGradColorC;
l9_1470=l9_1471;
float4 l9_1472=float4(0.0);
l9_1472=l9_1470;
float4 l9_1473=float4(0.0);
float4 l9_1474=(*sc_set0.UserUniforms).shapeGradColorD;
l9_1473=l9_1474;
float4 l9_1475=float4(0.0);
l9_1475=l9_1473;
float4 l9_1476=float4(0.0);
l9_1476=mix(l9_1472,l9_1475,float4(l9_1464));
float4 l9_1477=float4(0.0);
l9_1477=mix(l9_1469,l9_1476,float4(l9_1465));
float4 l9_1478=float4(0.0);
l9_1478=l9_1477;
l9_1418=l9_1478;
l9_1421=l9_1418;
}
else
{
l9_1421=l9_1419;
}
}
l9_1416=l9_1421;
l9_1313=l9_1416;
l9_1316=l9_1313;
}
else
{
l9_1316=l9_1314;
}
}
}
l9_1310=l9_1316;
float l9_1479=0.0;
l9_1479=fast::clamp(l9_1306+0.001,(*sc_set0.UserUniforms).Port_Input1_N265+0.001,(*sc_set0.UserUniforms).Port_Input2_N265+0.001)-0.001;
float l9_1480=0.0;
l9_1480=1.0-l9_1479;
float2 l9_1481=float2(0.0);
l9_1481.x=l9_1204;
l9_1481.y=l9_1212;
float2 l9_1482=float2(0.0);
l9_1482=l9_1291-l9_1481;
float l9_1483=0.0;
l9_1483=abs(l9_1231);
float l9_1484=0.0;
l9_1484=fast::min(l9_1483,l9_1204);
float l9_1485=0.0;
l9_1485=fast::min(l9_1484,l9_1212);
float l9_1486=0.0;
l9_1486=fast::max(l9_1485,(*sc_set0.UserUniforms).Port_Input1_N098);
float2 l9_1487=float2(0.0);
l9_1487=l9_1482+float2(l9_1486);
float2 l9_1488=float2(0.0);
l9_1488=fast::max(l9_1487,(*sc_set0.UserUniforms).Port_Input1_N115);
float l9_1489=0.0;
l9_1489=length(l9_1488);
float l9_1490=0.0;
l9_1490=l9_1489/l9_1486;
float l9_1491=0.0;
l9_1491=1.0-l9_1490;
float l9_1492=0.0;
float l9_1493=l9_1491;
float l9_1494=fwidth(l9_1493);
l9_1492=l9_1494;
float l9_1495=0.0;
l9_1495=l9_1491/l9_1492;
float l9_1496=0.0;
l9_1496=fast::clamp(l9_1495+0.001,(*sc_set0.UserUniforms).Port_Input1_N142+0.001,(*sc_set0.UserUniforms).Port_Input2_N142+0.001)-0.001;
float l9_1497=0.0;
l9_1497=l9_1480*l9_1496;
float l9_1498=0.0;
l9_1498=fast::clamp(l9_1497+0.001,(*sc_set0.UserUniforms).Port_Input1_N144+0.001,(*sc_set0.UserUniforms).Port_Input2_N144+0.001)-0.001;
float l9_1499=0.0;
l9_1499=l9_1498*l9_1256;
float l9_1500=0.0;
l9_1500=l9_1307*l9_863;
float l9_1501=0.0;
l9_1501=l9_1499+l9_1500;
float l9_1502=0.0;
l9_1502=fast::max(l9_1499,l9_1500);
float l9_1503=0.0;
l9_1503=l9_1501-l9_1502;
float l9_1504=0.0;
l9_1504=l9_1503+l9_1500;
float l9_1505=0.0;
float l9_1506;
if ((int(shapeColorInvert_tmp)!=0))
{
l9_1506=1.001;
}
else
{
l9_1506=0.001;
}
l9_1506-=0.001;
l9_1505=l9_1506;
float l9_1507=0.0;
l9_1507=1.0-l9_1505;
float l9_1508=0.0;
float l9_1509=l9_1504;
float l9_1510=(*sc_set0.UserUniforms).Port_RangeMinA_N171;
float l9_1511=(*sc_set0.UserUniforms).Port_RangeMaxA_N171;
float l9_1512=l9_1507;
float l9_1513=l9_1505;
float l9_1514=(((l9_1509-l9_1510)/((l9_1511-l9_1510)+1e-06))*(l9_1513-l9_1512))+l9_1512;
float l9_1515;
if (l9_1513>l9_1512)
{
l9_1515=fast::clamp(l9_1514,l9_1512,l9_1513);
}
else
{
l9_1515=fast::clamp(l9_1514,l9_1513,l9_1512);
}
l9_1514=l9_1515;
l9_1508=l9_1514;
float4 l9_1516=float4(0.0);
l9_1516=mix(l9_1309,l9_1310,float4(l9_1508));
float4 l9_1517=float4(0.0);
float4 l9_1518=(*sc_set0.UserUniforms).Port_Value0_N325;
float4 l9_1519=float4(0.0);
float4 l9_1520=(*sc_set0.UserUniforms).Port_Default_N325;
ssGlobals l9_1521=l9_10;
float4 l9_1522;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_1522=l9_1518;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float4 l9_1523=float4(0.0);
float4 l9_1524=float4(0.0);
float4 l9_1525=float4(0.0);
float4 l9_1526=float4(0.0);
float4 l9_1527=(*sc_set0.UserUniforms).Port_Default_N324;
ssGlobals l9_1528=l9_1521;
float4 l9_1529;
if (NODE_164_DROPLIST_ITEM_tmp==0)
{
float4 l9_1530=float4(0.0);
float4 l9_1531=(*sc_set0.UserUniforms).strokeColor;
l9_1530=l9_1531;
l9_1524=l9_1530;
l9_1529=l9_1524;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==1)
{
float2 l9_1532=float2(0.0);
l9_1532=l9_1528.Surface_UVCoord0;
float2 l9_1533=float2(0.0);
float2 l9_1534=(*sc_set0.UserUniforms).strokeScale;
l9_1533=l9_1534;
float2 l9_1535=float2(0.0);
float2 l9_1536=(*sc_set0.UserUniforms).strokeOffset;
l9_1535=l9_1536;
float2 l9_1537=float2(0.0);
l9_1537=(l9_1532*l9_1533)+l9_1535;
float4 l9_1538=float4(0.0);
int l9_1539;
if ((int(strokeTextureHasSwappedViews_tmp)!=0))
{
int l9_1540=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1540=0;
}
else
{
l9_1540=in.varStereoViewID;
}
int l9_1541=l9_1540;
l9_1539=1-l9_1541;
}
else
{
int l9_1542=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_1542=0;
}
else
{
l9_1542=in.varStereoViewID;
}
int l9_1543=l9_1542;
l9_1539=l9_1543;
}
int l9_1544=l9_1539;
int l9_1545=strokeTextureLayout_tmp;
int l9_1546=l9_1544;
float2 l9_1547=l9_1537;
bool l9_1548=(int(SC_USE_UV_TRANSFORM_strokeTexture_tmp)!=0);
float3x3 l9_1549=(*sc_set0.UserUniforms).strokeTextureTransform;
int2 l9_1550=int2(SC_SOFTWARE_WRAP_MODE_U_strokeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_strokeTexture_tmp);
bool l9_1551=(int(SC_USE_UV_MIN_MAX_strokeTexture_tmp)!=0);
float4 l9_1552=(*sc_set0.UserUniforms).strokeTextureUvMinMax;
bool l9_1553=(int(SC_USE_CLAMP_TO_BORDER_strokeTexture_tmp)!=0);
float4 l9_1554=(*sc_set0.UserUniforms).strokeTextureBorderColor;
float l9_1555=0.0;
bool l9_1556=l9_1553&&(!l9_1551);
float l9_1557=1.0;
float l9_1558=l9_1547.x;
int l9_1559=l9_1550.x;
if (l9_1559==1)
{
l9_1558=fract(l9_1558);
}
else
{
if (l9_1559==2)
{
float l9_1560=fract(l9_1558);
float l9_1561=l9_1558-l9_1560;
float l9_1562=step(0.25,fract(l9_1561*0.5));
l9_1558=mix(l9_1560,1.0-l9_1560,fast::clamp(l9_1562,0.0,1.0));
}
}
l9_1547.x=l9_1558;
float l9_1563=l9_1547.y;
int l9_1564=l9_1550.y;
if (l9_1564==1)
{
l9_1563=fract(l9_1563);
}
else
{
if (l9_1564==2)
{
float l9_1565=fract(l9_1563);
float l9_1566=l9_1563-l9_1565;
float l9_1567=step(0.25,fract(l9_1566*0.5));
l9_1563=mix(l9_1565,1.0-l9_1565,fast::clamp(l9_1567,0.0,1.0));
}
}
l9_1547.y=l9_1563;
if (l9_1551)
{
bool l9_1568=l9_1553;
bool l9_1569;
if (l9_1568)
{
l9_1569=l9_1550.x==3;
}
else
{
l9_1569=l9_1568;
}
float l9_1570=l9_1547.x;
float l9_1571=l9_1552.x;
float l9_1572=l9_1552.z;
bool l9_1573=l9_1569;
float l9_1574=l9_1557;
float l9_1575=fast::clamp(l9_1570,l9_1571,l9_1572);
float l9_1576=step(abs(l9_1570-l9_1575),9.9999997e-06);
l9_1574*=(l9_1576+((1.0-float(l9_1573))*(1.0-l9_1576)));
l9_1570=l9_1575;
l9_1547.x=l9_1570;
l9_1557=l9_1574;
bool l9_1577=l9_1553;
bool l9_1578;
if (l9_1577)
{
l9_1578=l9_1550.y==3;
}
else
{
l9_1578=l9_1577;
}
float l9_1579=l9_1547.y;
float l9_1580=l9_1552.y;
float l9_1581=l9_1552.w;
bool l9_1582=l9_1578;
float l9_1583=l9_1557;
float l9_1584=fast::clamp(l9_1579,l9_1580,l9_1581);
float l9_1585=step(abs(l9_1579-l9_1584),9.9999997e-06);
l9_1583*=(l9_1585+((1.0-float(l9_1582))*(1.0-l9_1585)));
l9_1579=l9_1584;
l9_1547.y=l9_1579;
l9_1557=l9_1583;
}
float2 l9_1586=l9_1547;
bool l9_1587=l9_1548;
float3x3 l9_1588=l9_1549;
if (l9_1587)
{
l9_1586=float2((l9_1588*float3(l9_1586,1.0)).xy);
}
float2 l9_1589=l9_1586;
l9_1547=l9_1589;
float l9_1590=l9_1547.x;
int l9_1591=l9_1550.x;
bool l9_1592=l9_1556;
float l9_1593=l9_1557;
if ((l9_1591==0)||(l9_1591==3))
{
float l9_1594=l9_1590;
float l9_1595=0.0;
float l9_1596=1.0;
bool l9_1597=l9_1592;
float l9_1598=l9_1593;
float l9_1599=fast::clamp(l9_1594,l9_1595,l9_1596);
float l9_1600=step(abs(l9_1594-l9_1599),9.9999997e-06);
l9_1598*=(l9_1600+((1.0-float(l9_1597))*(1.0-l9_1600)));
l9_1594=l9_1599;
l9_1590=l9_1594;
l9_1593=l9_1598;
}
l9_1547.x=l9_1590;
l9_1557=l9_1593;
float l9_1601=l9_1547.y;
int l9_1602=l9_1550.y;
bool l9_1603=l9_1556;
float l9_1604=l9_1557;
if ((l9_1602==0)||(l9_1602==3))
{
float l9_1605=l9_1601;
float l9_1606=0.0;
float l9_1607=1.0;
bool l9_1608=l9_1603;
float l9_1609=l9_1604;
float l9_1610=fast::clamp(l9_1605,l9_1606,l9_1607);
float l9_1611=step(abs(l9_1605-l9_1610),9.9999997e-06);
l9_1609*=(l9_1611+((1.0-float(l9_1608))*(1.0-l9_1611)));
l9_1605=l9_1610;
l9_1601=l9_1605;
l9_1604=l9_1609;
}
l9_1547.y=l9_1601;
l9_1557=l9_1604;
float2 l9_1612=l9_1547;
int l9_1613=l9_1545;
int l9_1614=l9_1546;
float l9_1615=l9_1555;
float2 l9_1616=l9_1612;
int l9_1617=l9_1613;
int l9_1618=l9_1614;
float3 l9_1619=float3(0.0);
if (l9_1617==0)
{
l9_1619=float3(l9_1616,0.0);
}
else
{
if (l9_1617==1)
{
l9_1619=float3(l9_1616.x,(l9_1616.y*0.5)+(0.5-(float(l9_1618)*0.5)),0.0);
}
else
{
l9_1619=float3(l9_1616,float(l9_1618));
}
}
float3 l9_1620=l9_1619;
float3 l9_1621=l9_1620;
float4 l9_1622=sc_set0.strokeTexture.sample(sc_set0.strokeTextureSmpSC,l9_1621.xy,bias(l9_1615));
float4 l9_1623=l9_1622;
if (l9_1553)
{
l9_1623=mix(l9_1554,l9_1623,float4(l9_1557));
}
float4 l9_1624=l9_1623;
l9_1538=l9_1624;
float4 l9_1625=float4(0.0);
float4 l9_1626=(*sc_set0.UserUniforms).strokeColor;
l9_1625=l9_1626;
float4 l9_1627=float4(0.0);
l9_1627=l9_1538*l9_1625;
l9_1525=l9_1627;
l9_1529=l9_1525;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==2)
{
float4 l9_1628=float4(0.0);
float4 l9_1629=float4(0.0);
float4 l9_1630=float4(0.0);
float4 l9_1631=(*sc_set0.UserUniforms).Port_Default_N323;
ssGlobals l9_1632=l9_1528;
float4 l9_1633;
if (int((int(toQuadStrokeGrad_tmp)!=0))==0)
{
float4 l9_1634=float4(0.0);
float4 l9_1635=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_1634=l9_1635;
float4 l9_1636=float4(0.0);
l9_1636=l9_1634;
float4 l9_1637=float4(0.0);
float4 l9_1638=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_1637=l9_1638;
float4 l9_1639=float4(0.0);
l9_1639=l9_1637;
float2 l9_1640=float2(0.0);
l9_1640=l9_1632.Surface_UVCoord0;
float2 l9_1641=float2(0.0);
l9_1641=(((l9_1640-float2((*sc_set0.UserUniforms).Port_RangeMinA_N231))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N231-(*sc_set0.UserUniforms).Port_RangeMinA_N231)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N231-(*sc_set0.UserUniforms).Port_RangeMinB_N231))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N231);
float2 l9_1642=float2(0.0);
float2 l9_1643=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_1642=l9_1643;
float2 l9_1644=float2(0.0);
l9_1644=l9_1642;
float2 l9_1645=float2(0.0);
l9_1645=((l9_1641-(*sc_set0.UserUniforms).Port_Center_N233)*l9_1644)+(*sc_set0.UserUniforms).Port_Center_N233;
float2 l9_1646=float2(0.0);
float2 l9_1647=(*sc_set0.UserUniforms).shapeGradPointA2;
l9_1646=l9_1647;
float2 l9_1648=float2(0.0);
l9_1648=l9_1646;
float2 l9_1649=float2(0.0);
l9_1649=l9_1645-l9_1648;
float2 l9_1650=float2(0.0);
float2 l9_1651=(*sc_set0.UserUniforms).shapeGradPointB2;
l9_1650=l9_1651;
float2 l9_1652=float2(0.0);
l9_1652=l9_1650;
float2 l9_1653=float2(0.0);
l9_1653=l9_1652-l9_1648;
float l9_1654=0.0;
l9_1654=dot(l9_1649,l9_1653);
float l9_1655=0.0;
l9_1655=dot(l9_1653,l9_1653);
float l9_1656=0.0;
l9_1656=l9_1654/l9_1655;
float l9_1657=0.0;
l9_1657=fast::clamp(l9_1656+0.001,(*sc_set0.UserUniforms).Port_Input1_N241+0.001,(*sc_set0.UserUniforms).Port_Input2_N241+0.001)-0.001;
float l9_1658=0.0;
l9_1658=smoothstep((*sc_set0.UserUniforms).Port_Input0_N242,(*sc_set0.UserUniforms).Port_Input1_N242,l9_1657);
float4 l9_1659=float4(0.0);
l9_1659=mix(l9_1636,l9_1639,float4(l9_1658));
float4 l9_1660=float4(0.0);
l9_1660=l9_1659;
l9_1629=l9_1660;
l9_1633=l9_1629;
}
else
{
if (int((int(toQuadStrokeGrad_tmp)!=0))==1)
{
float4 l9_1661=float4(0.0);
float4 l9_1662=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_1661=l9_1662;
float4 l9_1663=float4(0.0);
l9_1663=l9_1661;
float4 l9_1664=float4(0.0);
float4 l9_1665=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_1664=l9_1665;
float4 l9_1666=float4(0.0);
l9_1666=l9_1664;
float2 l9_1667=float2(0.0);
l9_1667=l9_1632.Surface_UVCoord0;
float2 l9_1668=float2(0.0);
l9_1668=(((l9_1667-float2((*sc_set0.UserUniforms).Port_RangeMinA_N252))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N252-(*sc_set0.UserUniforms).Port_RangeMinA_N252)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N252-(*sc_set0.UserUniforms).Port_RangeMinB_N252))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N252);
float2 l9_1669=float2(0.0);
float2 l9_1670=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_1669=l9_1670;
float2 l9_1671=float2(0.0);
l9_1671=l9_1669;
float2 l9_1672=float2(0.0);
float2 l9_1673=(*sc_set0.UserUniforms).shapeQuadOffset2;
l9_1672=l9_1673;
float2 l9_1674=float2(0.0);
l9_1674=l9_1672;
float2 l9_1675=float2(0.0);
l9_1675=(l9_1668*l9_1671)+l9_1674;
float l9_1676=0.0;
float l9_1677=0.0;
float2 l9_1678=l9_1675;
float l9_1679=l9_1678.x;
float l9_1680=l9_1678.y;
l9_1676=l9_1679;
l9_1677=l9_1680;
float4 l9_1681=float4(0.0);
l9_1681=mix(l9_1663,l9_1666,float4(l9_1676));
float4 l9_1682=float4(0.0);
float4 l9_1683=(*sc_set0.UserUniforms).shapeGradColorC2;
l9_1682=l9_1683;
float4 l9_1684=float4(0.0);
l9_1684=l9_1682;
float4 l9_1685=float4(0.0);
float4 l9_1686=(*sc_set0.UserUniforms).shapeGradColorD2;
l9_1685=l9_1686;
float4 l9_1687=float4(0.0);
l9_1687=l9_1685;
float4 l9_1688=float4(0.0);
l9_1688=mix(l9_1684,l9_1687,float4(l9_1676));
float4 l9_1689=float4(0.0);
l9_1689=mix(l9_1681,l9_1688,float4(l9_1677));
float4 l9_1690=float4(0.0);
l9_1690=l9_1689;
l9_1630=l9_1690;
l9_1633=l9_1630;
}
else
{
l9_1633=l9_1631;
}
}
l9_1628=l9_1633;
l9_1526=l9_1628;
l9_1529=l9_1526;
}
else
{
l9_1529=l9_1527;
}
}
}
l9_1523=l9_1529;
l9_1519=l9_1523;
l9_1522=l9_1519;
}
else
{
l9_1522=l9_1520;
}
}
l9_1517=l9_1522;
float4 l9_1691=float4(0.0);
l9_1691=mix(l9_1516,l9_1517,float4(l9_1499));
float l9_1692=0.0;
float l9_1693=0.0;
float l9_1694=0.0;
float l9_1695=0.0;
float4 l9_1696=l9_1691;
float l9_1697=l9_1696.x;
float l9_1698=l9_1696.y;
float l9_1699=l9_1696.z;
float l9_1700=l9_1696.w;
l9_1692=l9_1697;
l9_1693=l9_1698;
l9_1694=l9_1699;
l9_1695=l9_1700;
float l9_1701=0.0;
l9_1701=l9_1695*(*sc_set0.UserUniforms).Port_Input1_N335;
float4 l9_1702=float4(0.0);
l9_1702.x=l9_1692;
l9_1702.y=l9_1693;
l9_1702.z=l9_1694;
l9_1702.w=l9_1701;
l9_9=l9_1702;
l9_13=l9_9;
}
l9_6=l9_13;
param_2=l9_6;
param_4=param_2;
}
else
{
float4 l9_1703=float4(0.0);
float l9_1704=0.0;
float4 l9_1705=float4(0.0);
float4 l9_1706=float4(0.0);
ssGlobals l9_1707=param_5;
float l9_1708=0.0;
float l9_1709=float((*sc_set0.UserUniforms).Hover!=0);
l9_1708=l9_1709;
l9_1704=l9_1708;
float4 l9_1710;
if ((l9_1704*1.0)!=0.0)
{
float4 l9_1711=float4(0.0);
float4 l9_1712=float4(0.0);
float4 l9_1713=float4(0.0);
float4 l9_1714=(*sc_set0.UserUniforms).Port_Default_N126;
float4 l9_1715;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
float l9_1716=0.0;
float l9_1717;
if ((int(Tweak_N124_tmp)!=0))
{
l9_1717=1.001;
}
else
{
l9_1717=0.001;
}
l9_1717-=0.001;
l9_1716=l9_1717;
float l9_1718=0.0;
l9_1718=(((l9_1716-(*sc_set0.UserUniforms).Port_RangeMinA_N136)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N136-(*sc_set0.UserUniforms).Port_RangeMinA_N136)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N136-(*sc_set0.UserUniforms).Port_RangeMinB_N136))+(*sc_set0.UserUniforms).Port_RangeMinB_N136;
l9_1712=float4(l9_1718);
l9_1715=l9_1712;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float4 l9_1719=float4(0.0);
float4 l9_1720=(*sc_set0.UserUniforms).shadowColor;
l9_1719=l9_1720;
l9_1713=l9_1719;
l9_1715=l9_1713;
}
else
{
l9_1715=l9_1714;
}
}
l9_1711=l9_1715;
float l9_1721=0.0;
float l9_1722=(*sc_set0.UserUniforms).shapeAlpha;
l9_1721=l9_1722;
float2 l9_1723=float2(0.0);
l9_1723=l9_1707.Surface_UVCoord0;
float4 l9_1724=float4(0.0);
float4 l9_1725=(*sc_set0.UserUniforms).Port_Value0_N154;
float4 l9_1726=float4(1.0);
float4 l9_1727=(*sc_set0.UserUniforms).Port_Default_N154;
float4 l9_1728;
if (int((int(shapeAspectFix_tmp)!=0))==0)
{
l9_1728=l9_1725;
}
else
{
if (int((int(shapeAspectFix_tmp)!=0))==1)
{
float l9_1729=0.0;
l9_1729=(*sc_set0.UserUniforms).sc_Camera.aspect;
float l9_1730=0.0;
l9_1730=1.0/l9_1729;
float2 l9_1731=float2(0.0);
l9_1731.x=(*sc_set0.UserUniforms).Port_Value1_N157;
l9_1731.y=l9_1730;
l9_1726=float4(l9_1731,0.0,0.0);
l9_1728=l9_1726;
}
else
{
l9_1728=l9_1727;
}
}
l9_1724=l9_1728;
float2 l9_1732=float2(0.0);
l9_1732=(l9_1723*l9_1724.xy)+(*sc_set0.UserUniforms).Port_Input2_N148;
float l9_1733=0.0;
float l9_1734=(*sc_set0.UserUniforms).shapeWidthX;
l9_1733=l9_1734;
float l9_1735=0.0;
l9_1735=l9_1733;
float l9_1736=0.0;
float l9_1737=0.0;
float l9_1738=(*sc_set0.UserUniforms).Port_Value0_N287;
float l9_1739=0.0;
float l9_1740=(*sc_set0.UserUniforms).Port_Default_N287;
float l9_1741=0.0;
float l9_1742=float((*sc_set0.UserUniforms).xRightPin!=0);
l9_1741=l9_1742;
float l9_1743=0.0;
l9_1743=l9_1741;
l9_1737=l9_1743;
l9_1737=floor(l9_1737);
float l9_1744;
if (l9_1737==0.0)
{
l9_1744=l9_1738;
}
else
{
if (l9_1737==1.0)
{
float l9_1745=0.0;
float l9_1746=0.0;
float l9_1747=0.0;
float l9_1748=(*sc_set0.UserUniforms).Port_Default_N294;
float l9_1749;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_1750=0.0;
float l9_1751=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_1752=l9_1751+0.001;
l9_1752-=0.001;
l9_1750=l9_1752;
l9_1746=l9_1750;
l9_1749=l9_1746;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1753=0.0;
float l9_1754=(*sc_set0.UserUniforms).strokeThickness;
l9_1753=l9_1754;
float l9_1755=0.0;
l9_1755=l9_1753;
float l9_1756=0.0;
float l9_1757=l9_1755;
float l9_1758=(*sc_set0.UserUniforms).Port_RangeMinA_N276;
float l9_1759=(*sc_set0.UserUniforms).Port_RangeMaxA_N276;
float l9_1760=(*sc_set0.UserUniforms).Port_RangeMinB_N276;
float l9_1761=(*sc_set0.UserUniforms).Port_RangeMaxB_N276;
float l9_1762=(((l9_1757-l9_1758)/((l9_1759-l9_1758)+1e-06))*(l9_1761-l9_1760))+l9_1760;
float l9_1763;
if (l9_1761>l9_1760)
{
l9_1763=fast::clamp(l9_1762,l9_1760,l9_1761);
}
else
{
l9_1763=fast::clamp(l9_1762,l9_1761,l9_1760);
}
l9_1762=l9_1763;
l9_1756=l9_1762;
l9_1747=l9_1756;
l9_1749=l9_1747;
}
else
{
l9_1749=l9_1748;
}
}
l9_1745=l9_1749;
l9_1739=l9_1745;
l9_1744=l9_1739;
}
else
{
l9_1744=l9_1740;
}
}
l9_1736=l9_1744;
float l9_1764=0.0;
float l9_1765=0.0;
float l9_1766=(*sc_set0.UserUniforms).Port_Value0_N281;
float l9_1767=0.0;
float l9_1768=(*sc_set0.UserUniforms).Port_Default_N281;
float l9_1769=0.0;
float l9_1770=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_1769=l9_1770;
float l9_1771=0.0;
l9_1771=l9_1769;
l9_1765=l9_1771;
l9_1765=floor(l9_1765);
float l9_1772;
if (l9_1765==0.0)
{
l9_1772=l9_1766;
}
else
{
if (l9_1765==1.0)
{
float l9_1773=0.0;
float l9_1774=0.0;
float l9_1775=0.0;
float l9_1776=(*sc_set0.UserUniforms).Port_Default_N296;
float l9_1777;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_1778=0.0;
float l9_1779=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_1780=l9_1779+0.001;
l9_1780-=0.001;
l9_1778=l9_1780;
l9_1774=l9_1778;
l9_1777=l9_1774;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1781=0.0;
float l9_1782=(*sc_set0.UserUniforms).strokeThickness;
l9_1781=l9_1782;
float l9_1783=0.0;
l9_1783=l9_1781;
float l9_1784=0.0;
float l9_1785=l9_1783;
float l9_1786=(*sc_set0.UserUniforms).Port_RangeMinA_N295;
float l9_1787=(*sc_set0.UserUniforms).Port_RangeMaxA_N295;
float l9_1788=(*sc_set0.UserUniforms).Port_RangeMinB_N295;
float l9_1789=(*sc_set0.UserUniforms).Port_RangeMaxB_N295;
float l9_1790=(((l9_1785-l9_1786)/((l9_1787-l9_1786)+1e-06))*(l9_1789-l9_1788))+l9_1788;
float l9_1791;
if (l9_1789>l9_1788)
{
l9_1791=fast::clamp(l9_1790,l9_1788,l9_1789);
}
else
{
l9_1791=fast::clamp(l9_1790,l9_1789,l9_1788);
}
l9_1790=l9_1791;
l9_1784=l9_1790;
l9_1775=l9_1784;
l9_1777=l9_1775;
}
else
{
l9_1777=l9_1776;
}
}
l9_1773=l9_1777;
l9_1767=l9_1773;
l9_1772=l9_1767;
}
else
{
l9_1772=l9_1768;
}
}
l9_1764=l9_1772;
float l9_1792=0.0;
float l9_1793=l9_1735;
float l9_1794=(*sc_set0.UserUniforms).Port_RangeMinA_N268;
float l9_1795=(*sc_set0.UserUniforms).Port_RangeMaxA_N268;
float l9_1796=l9_1736;
float l9_1797=l9_1764;
float l9_1798=(((l9_1793-l9_1794)/((l9_1795-l9_1794)+1e-06))*(l9_1797-l9_1796))+l9_1796;
float l9_1799;
if (l9_1797>l9_1796)
{
l9_1799=fast::clamp(l9_1798,l9_1796,l9_1797);
}
else
{
l9_1799=fast::clamp(l9_1798,l9_1797,l9_1796);
}
l9_1798=l9_1799;
l9_1792=l9_1798;
float l9_1800=0.0;
float l9_1801=(*sc_set0.UserUniforms).xOffset;
l9_1800=l9_1801;
float l9_1802=0.0;
l9_1802=l9_1800;
float l9_1803=0.0;
float l9_1804=0.0;
float l9_1805=(*sc_set0.UserUniforms).Port_Value0_N282;
float l9_1806=(*sc_set0.UserUniforms).Port_Value1_N282;
float l9_1807=(*sc_set0.UserUniforms).Port_Default_N282;
float l9_1808=0.0;
float l9_1809=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_1808=l9_1809;
float l9_1810=0.0;
l9_1810=l9_1808;
l9_1804=l9_1810;
l9_1804=floor(l9_1804);
float l9_1811;
if (l9_1804==0.0)
{
l9_1811=l9_1805;
}
else
{
if (l9_1804==1.0)
{
l9_1811=l9_1806;
}
else
{
l9_1811=l9_1807;
}
}
l9_1803=l9_1811;
float l9_1812=0.0;
l9_1812=l9_1802+l9_1803;
float l9_1813=0.0;
l9_1813=1.0-l9_1812;
float l9_1814=0.0;
float l9_1815=(*sc_set0.UserUniforms).Port_Value0_N308;
float l9_1816=0.0;
float l9_1817=(*sc_set0.UserUniforms).Port_Default_N308;
float l9_1818;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_1818=l9_1815;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1819=0.0;
float l9_1820=0.0;
float l9_1821=(*sc_set0.UserUniforms).Port_Value0_N304;
float l9_1822=0.0;
float l9_1823=(*sc_set0.UserUniforms).Port_Default_N304;
float l9_1824=0.0;
float l9_1825=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_1824=l9_1825;
float l9_1826=0.0;
l9_1826=l9_1824;
l9_1820=l9_1826;
l9_1820=floor(l9_1820);
float l9_1827;
if (l9_1820==0.0)
{
l9_1827=l9_1821;
}
else
{
if (l9_1820==1.0)
{
float l9_1828=0.0;
float l9_1829=(*sc_set0.UserUniforms).strokeThickness;
l9_1828=l9_1829;
float l9_1830=0.0;
l9_1830=l9_1828;
float l9_1831=0.0;
float l9_1832=l9_1830;
float l9_1833=(*sc_set0.UserUniforms).Port_RangeMinA_N303;
float l9_1834=(*sc_set0.UserUniforms).Port_RangeMaxA_N303;
float l9_1835=(*sc_set0.UserUniforms).Port_RangeMinB_N303;
float l9_1836=(*sc_set0.UserUniforms).Port_RangeMaxB_N303;
float l9_1837=(((l9_1832-l9_1833)/((l9_1834-l9_1833)+1e-06))*(l9_1836-l9_1835))+l9_1835;
float l9_1838;
if (l9_1836>l9_1835)
{
l9_1838=fast::clamp(l9_1837,l9_1835,l9_1836);
}
else
{
l9_1838=fast::clamp(l9_1837,l9_1836,l9_1835);
}
l9_1837=l9_1838;
l9_1831=l9_1837;
l9_1822=l9_1831;
l9_1827=l9_1822;
}
else
{
l9_1827=l9_1823;
}
}
l9_1819=l9_1827;
l9_1816=l9_1819;
l9_1818=l9_1816;
}
else
{
l9_1818=l9_1817;
}
}
l9_1814=l9_1818;
float l9_1839=0.0;
l9_1839=l9_1813+l9_1814;
float l9_1840=0.0;
l9_1840=l9_1792+l9_1839;
float l9_1841=0.0;
float l9_1842=(*sc_set0.UserUniforms).shapeHeightY;
l9_1841=l9_1842;
float l9_1843=0.0;
l9_1843=l9_1841;
float l9_1844=0.0;
float l9_1845=0.0;
float l9_1846=(*sc_set0.UserUniforms).Port_Value0_N289;
float l9_1847=0.0;
float l9_1848=(*sc_set0.UserUniforms).Port_Default_N289;
float l9_1849=0.0;
float l9_1850=float((*sc_set0.UserUniforms).yUpPin!=0);
l9_1849=l9_1850;
float l9_1851=0.0;
l9_1851=l9_1849;
l9_1845=l9_1851;
l9_1845=floor(l9_1845);
float l9_1852;
if (l9_1845==0.0)
{
l9_1852=l9_1846;
}
else
{
if (l9_1845==1.0)
{
float l9_1853=0.0;
float l9_1854=0.0;
float l9_1855=0.0;
float l9_1856=(*sc_set0.UserUniforms).Port_Default_N297;
float l9_1857;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_1858=0.0;
float l9_1859=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_1860=l9_1859+0.001;
l9_1860-=0.001;
l9_1858=l9_1860;
l9_1854=l9_1858;
l9_1857=l9_1854;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1861=0.0;
float l9_1862=(*sc_set0.UserUniforms).strokeThickness;
l9_1861=l9_1862;
float l9_1863=0.0;
l9_1863=l9_1861;
float l9_1864=0.0;
float l9_1865=l9_1863;
float l9_1866=(*sc_set0.UserUniforms).Port_RangeMinA_N299;
float l9_1867=(*sc_set0.UserUniforms).Port_RangeMaxA_N299;
float l9_1868=(*sc_set0.UserUniforms).Port_RangeMinB_N299;
float l9_1869=(*sc_set0.UserUniforms).Port_RangeMaxB_N299;
float l9_1870=(((l9_1865-l9_1866)/((l9_1867-l9_1866)+1e-06))*(l9_1869-l9_1868))+l9_1868;
float l9_1871;
if (l9_1869>l9_1868)
{
l9_1871=fast::clamp(l9_1870,l9_1868,l9_1869);
}
else
{
l9_1871=fast::clamp(l9_1870,l9_1869,l9_1868);
}
l9_1870=l9_1871;
l9_1864=l9_1870;
l9_1855=l9_1864;
l9_1857=l9_1855;
}
else
{
l9_1857=l9_1856;
}
}
l9_1853=l9_1857;
l9_1847=l9_1853;
l9_1852=l9_1847;
}
else
{
l9_1852=l9_1848;
}
}
l9_1844=l9_1852;
float l9_1872=0.0;
float l9_1873=0.0;
float l9_1874=(*sc_set0.UserUniforms).Port_Value0_N286;
float l9_1875=0.0;
float l9_1876=(*sc_set0.UserUniforms).Port_Default_N286;
float l9_1877=0.0;
float l9_1878=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_1877=l9_1878;
float l9_1879=0.0;
l9_1879=l9_1877;
l9_1873=l9_1879;
l9_1873=floor(l9_1873);
float l9_1880;
if (l9_1873==0.0)
{
l9_1880=l9_1874;
}
else
{
if (l9_1873==1.0)
{
float l9_1881=0.0;
float l9_1882=0.0;
float l9_1883=0.0;
float l9_1884=(*sc_set0.UserUniforms).Port_Default_N298;
float l9_1885;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_1886=0.0;
float l9_1887=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_1888=l9_1887+0.001;
l9_1888-=0.001;
l9_1886=l9_1888;
l9_1882=l9_1886;
l9_1885=l9_1882;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1889=0.0;
float l9_1890=(*sc_set0.UserUniforms).strokeThickness;
l9_1889=l9_1890;
float l9_1891=0.0;
l9_1891=l9_1889;
float l9_1892=0.0;
float l9_1893=l9_1891;
float l9_1894=(*sc_set0.UserUniforms).Port_RangeMinA_N300;
float l9_1895=(*sc_set0.UserUniforms).Port_RangeMaxA_N300;
float l9_1896=(*sc_set0.UserUniforms).Port_RangeMinB_N300;
float l9_1897=(*sc_set0.UserUniforms).Port_RangeMaxB_N300;
float l9_1898=(((l9_1893-l9_1894)/((l9_1895-l9_1894)+1e-06))*(l9_1897-l9_1896))+l9_1896;
float l9_1899;
if (l9_1897>l9_1896)
{
l9_1899=fast::clamp(l9_1898,l9_1896,l9_1897);
}
else
{
l9_1899=fast::clamp(l9_1898,l9_1897,l9_1896);
}
l9_1898=l9_1899;
l9_1892=l9_1898;
l9_1883=l9_1892;
l9_1885=l9_1883;
}
else
{
l9_1885=l9_1884;
}
}
l9_1881=l9_1885;
l9_1875=l9_1881;
l9_1880=l9_1875;
}
else
{
l9_1880=l9_1876;
}
}
l9_1872=l9_1880;
float l9_1900=0.0;
float l9_1901=l9_1843;
float l9_1902=(*sc_set0.UserUniforms).Port_RangeMinA_N277;
float l9_1903=(*sc_set0.UserUniforms).Port_RangeMaxA_N277;
float l9_1904=l9_1844;
float l9_1905=l9_1872;
float l9_1906=(((l9_1901-l9_1902)/((l9_1903-l9_1902)+1e-06))*(l9_1905-l9_1904))+l9_1904;
float l9_1907;
if (l9_1905>l9_1904)
{
l9_1907=fast::clamp(l9_1906,l9_1904,l9_1905);
}
else
{
l9_1907=fast::clamp(l9_1906,l9_1905,l9_1904);
}
l9_1906=l9_1907;
l9_1900=l9_1906;
float l9_1908=0.0;
float l9_1909=(*sc_set0.UserUniforms).yOffset;
l9_1908=l9_1909;
float l9_1910=0.0;
l9_1910=l9_1908;
float l9_1911=0.0;
float l9_1912=0.0;
float l9_1913=(*sc_set0.UserUniforms).Port_Value0_N293;
float l9_1914=(*sc_set0.UserUniforms).Port_Value1_N293;
float l9_1915=(*sc_set0.UserUniforms).Port_Default_N293;
float l9_1916=0.0;
float l9_1917=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_1916=l9_1917;
float l9_1918=0.0;
l9_1918=l9_1916;
l9_1912=l9_1918;
l9_1912=floor(l9_1912);
float l9_1919;
if (l9_1912==0.0)
{
l9_1919=l9_1913;
}
else
{
if (l9_1912==1.0)
{
l9_1919=l9_1914;
}
else
{
l9_1919=l9_1915;
}
}
l9_1911=l9_1919;
float l9_1920=0.0;
l9_1920=l9_1910+l9_1911;
float l9_1921=0.0;
float l9_1922=(*sc_set0.UserUniforms).Port_Value0_N301;
float l9_1923=0.0;
float l9_1924=(*sc_set0.UserUniforms).Port_Default_N301;
float l9_1925;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_1925=l9_1922;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_1926=0.0;
float l9_1927=0.0;
float l9_1928=(*sc_set0.UserUniforms).Port_Value0_N306;
float l9_1929=0.0;
float l9_1930=(*sc_set0.UserUniforms).Port_Default_N306;
float l9_1931=0.0;
float l9_1932=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_1931=l9_1932;
float l9_1933=0.0;
l9_1933=l9_1931;
l9_1927=l9_1933;
l9_1927=floor(l9_1927);
float l9_1934;
if (l9_1927==0.0)
{
l9_1934=l9_1928;
}
else
{
if (l9_1927==1.0)
{
float l9_1935=0.0;
float l9_1936=(*sc_set0.UserUniforms).strokeThickness;
l9_1935=l9_1936;
float l9_1937=0.0;
l9_1937=l9_1935;
float l9_1938=0.0;
float l9_1939=l9_1937;
float l9_1940=(*sc_set0.UserUniforms).Port_RangeMinA_N305;
float l9_1941=(*sc_set0.UserUniforms).Port_RangeMaxA_N305;
float l9_1942=(*sc_set0.UserUniforms).Port_RangeMinB_N305;
float l9_1943=(*sc_set0.UserUniforms).Port_RangeMaxB_N305;
float l9_1944=(((l9_1939-l9_1940)/((l9_1941-l9_1940)+1e-06))*(l9_1943-l9_1942))+l9_1942;
float l9_1945;
if (l9_1943>l9_1942)
{
l9_1945=fast::clamp(l9_1944,l9_1942,l9_1943);
}
else
{
l9_1945=fast::clamp(l9_1944,l9_1943,l9_1942);
}
l9_1944=l9_1945;
l9_1938=l9_1944;
l9_1929=l9_1938;
l9_1934=l9_1929;
}
else
{
l9_1934=l9_1930;
}
}
l9_1926=l9_1934;
l9_1923=l9_1926;
l9_1925=l9_1923;
}
else
{
l9_1925=l9_1924;
}
}
l9_1921=l9_1925;
float l9_1946=0.0;
l9_1946=l9_1920+l9_1921;
float l9_1947=0.0;
l9_1947=l9_1900+l9_1946;
float2 l9_1948=float2(0.0);
l9_1948.x=l9_1840;
l9_1948.y=l9_1947;
float2 l9_1949=float2(0.0);
l9_1949=l9_1948;
float2 l9_1950=float2(0.0);
l9_1950=l9_1732+l9_1949;
float l9_1951=0.0;
float l9_1952=(*sc_set0.UserUniforms).Port_Value0_N132;
float l9_1953=0.0;
float l9_1954=(*sc_set0.UserUniforms).Port_Default_N132;
float l9_1955;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_1955=l9_1952;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_1956=0.0;
float l9_1957=(*sc_set0.UserUniforms).shadowRotation;
l9_1956=l9_1957;
float l9_1958=0.0;
l9_1958=l9_1956+(*sc_set0.UserUniforms).Port_Input1_N141;
l9_1953=l9_1958;
l9_1955=l9_1953;
}
else
{
l9_1955=l9_1954;
}
}
l9_1951=l9_1955;
float2 l9_1959=float2(0.0);
float2 l9_1960=l9_1950;
float l9_1961=l9_1951;
float2 l9_1962=(*sc_set0.UserUniforms).Port_Center_N092;
float l9_1963=sin(radians(l9_1961));
float l9_1964=cos(radians(l9_1961));
float2 l9_1965=l9_1960-l9_1962;
l9_1965=float2(dot(float2(l9_1964,l9_1963),l9_1965),dot(float2(-l9_1963,l9_1964),l9_1965))+l9_1962;
l9_1959=l9_1965;
float l9_1966=0.0;
float l9_1967=(*sc_set0.UserUniforms).Port_Value0_N131;
float l9_1968=0.0;
float l9_1969=(*sc_set0.UserUniforms).Port_Default_N131;
float l9_1970;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_1970=l9_1967;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_1971=0.0;
float l9_1972=(*sc_set0.UserUniforms).shadowDistance;
l9_1971=l9_1972;
l9_1968=l9_1971;
l9_1970=l9_1968;
}
else
{
l9_1970=l9_1969;
}
}
l9_1966=l9_1970;
float l9_1973=0.0;
l9_1973=l9_1966/(*sc_set0.UserUniforms).Port_Input1_N160;
float2 l9_1974=float2(0.0);
l9_1974.x=(*sc_set0.UserUniforms).Port_Value1_N097;
l9_1974.y=l9_1973;
float2 l9_1975=float2(0.0);
l9_1975=l9_1959+l9_1974;
float l9_1976=0.0;
l9_1976=l9_1951+(*sc_set0.UserUniforms).Port_Input1_N263;
float l9_1977=0.0;
l9_1977=1.0-l9_1976;
float2 l9_1978=float2(0.0);
float2 l9_1979=l9_1975;
float l9_1980=l9_1977;
float2 l9_1981=(*sc_set0.UserUniforms).Port_Center_N094;
float l9_1982=sin(radians(l9_1980));
float l9_1983=cos(radians(l9_1980));
float2 l9_1984=l9_1979-l9_1981;
l9_1984=float2(dot(float2(l9_1983,l9_1982),l9_1984),dot(float2(-l9_1982,l9_1983),l9_1984))+l9_1981;
l9_1978=l9_1984;
float l9_1985=0.0;
float l9_1986=(*sc_set0.UserUniforms).shapeRotation;
l9_1985=l9_1986;
float2 l9_1987=float2(0.0);
float2 l9_1988=l9_1978;
float l9_1989=l9_1985;
float2 l9_1990=(*sc_set0.UserUniforms).Port_Center_N100;
float l9_1991=sin(radians(l9_1989));
float l9_1992=cos(radians(l9_1989));
float2 l9_1993=l9_1988-l9_1990;
l9_1993=float2(dot(float2(l9_1992,l9_1991),l9_1993),dot(float2(-l9_1991,l9_1992),l9_1993))+l9_1990;
l9_1987=l9_1993;
float l9_1994=0.0;
float l9_1995=(*sc_set0.UserUniforms).Port_Value0_N125;
float l9_1996=0.0;
float l9_1997=(*sc_set0.UserUniforms).Port_Default_N125;
float l9_1998;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_1998=l9_1995;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_1999=0.0;
float l9_2000=(*sc_set0.UserUniforms).shadowBlur;
l9_1999=l9_2000;
l9_1996=l9_1999;
l9_1998=l9_1996;
}
else
{
l9_1998=l9_1997;
}
}
l9_1994=l9_1998;
float l9_2001=0.0;
float l9_2002=l9_1994;
float l9_2003=(*sc_set0.UserUniforms).Port_RangeMinA_N138;
float l9_2004=(*sc_set0.UserUniforms).Port_RangeMaxA_N138;
float l9_2005=(*sc_set0.UserUniforms).Port_RangeMinB_N138;
float l9_2006=(*sc_set0.UserUniforms).Port_RangeMaxB_N138;
float l9_2007=(((l9_2002-l9_2003)/((l9_2004-l9_2003)+1e-06))*(l9_2006-l9_2005))+l9_2005;
float l9_2008;
if (l9_2006>l9_2005)
{
l9_2008=fast::clamp(l9_2007,l9_2005,l9_2006);
}
else
{
l9_2008=fast::clamp(l9_2007,l9_2006,l9_2005);
}
l9_2007=l9_2008;
l9_2001=l9_2007;
float2 l9_2009=float2(0.0);
l9_2009=((l9_1987-(*sc_set0.UserUniforms).Port_Center_N137)*float2(l9_2001))+(*sc_set0.UserUniforms).Port_Center_N137;
float2 l9_2010=float2(0.0);
l9_2010=l9_2009*float2((*sc_set0.UserUniforms).Port_Input1_N019);
float2 l9_2011=float2(0.0);
l9_2011=l9_2010+float2((*sc_set0.UserUniforms).Port_Input1_N020);
float2 l9_2012=float2(0.0);
l9_2012=abs(l9_2011);
float l9_2013=0.0;
float l9_2014=(*sc_set0.UserUniforms).Port_Value0_N122;
float l9_2015=0.0;
float l9_2016=(*sc_set0.UserUniforms).Port_Default_N122;
float l9_2017;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_2017=l9_2014;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2018=0.0;
float l9_2019=(*sc_set0.UserUniforms).strokeThickness;
l9_2018=l9_2019;
l9_2015=l9_2018;
l9_2017=l9_2015;
}
else
{
l9_2017=l9_2016;
}
}
l9_2013=l9_2017;
float l9_2020=0.0;
l9_2020=l9_2013/(*sc_set0.UserUniforms).Port_Input1_N056;
float l9_2021=0.0;
l9_2021=1.0-l9_2020;
float l9_2022=0.0;
float l9_2023=l9_1733;
float l9_2024=(*sc_set0.UserUniforms).Port_RangeMinA_N021;
float l9_2025=(*sc_set0.UserUniforms).Port_RangeMaxA_N021;
float l9_2026=(*sc_set0.UserUniforms).Port_RangeMinB_N021;
float l9_2027=l9_2021;
float l9_2028=(((l9_2023-l9_2024)/((l9_2025-l9_2024)+1e-06))*(l9_2027-l9_2026))+l9_2026;
float l9_2029;
if (l9_2027>l9_2026)
{
l9_2029=fast::clamp(l9_2028,l9_2026,l9_2027);
}
else
{
l9_2029=fast::clamp(l9_2028,l9_2027,l9_2026);
}
l9_2028=l9_2029;
l9_2022=l9_2028;
float l9_2030=0.0;
l9_2030=1.0-l9_2020;
float l9_2031=0.0;
float l9_2032=l9_1841;
float l9_2033=(*sc_set0.UserUniforms).Port_RangeMinA_N022;
float l9_2034=(*sc_set0.UserUniforms).Port_RangeMaxA_N022;
float l9_2035=(*sc_set0.UserUniforms).Port_RangeMinB_N022;
float l9_2036=l9_2030;
float l9_2037=(((l9_2032-l9_2033)/((l9_2034-l9_2033)+1e-06))*(l9_2036-l9_2035))+l9_2035;
float l9_2038;
if (l9_2036>l9_2035)
{
l9_2038=fast::clamp(l9_2037,l9_2035,l9_2036);
}
else
{
l9_2038=fast::clamp(l9_2037,l9_2036,l9_2035);
}
l9_2037=l9_2038;
l9_2031=l9_2037;
float2 l9_2039=float2(0.0);
l9_2039.x=l9_2022;
l9_2039.y=l9_2031;
float2 l9_2040=float2(0.0);
l9_2040=l9_2012-l9_2039;
float l9_2041=0.0;
float l9_2042=(*sc_set0.UserUniforms).shapeRoundness;
l9_2041=l9_2042;
float l9_2043=0.0;
l9_2043=abs(l9_2041);
float l9_2044=0.0;
l9_2044=fast::min(l9_2043,l9_2022);
float l9_2045=0.0;
l9_2045=fast::min(l9_2044,l9_2031);
float l9_2046=0.0;
l9_2046=fast::max(l9_2045,(*sc_set0.UserUniforms).Port_Input1_N030);
float2 l9_2047=float2(0.0);
l9_2047=l9_2040+float2(l9_2046);
float2 l9_2048=float2(0.0);
l9_2048=fast::max(l9_2047,(*sc_set0.UserUniforms).Port_Input1_N032);
float l9_2049=0.0;
l9_2049=length(l9_2048);
float l9_2050=0.0;
l9_2050=l9_2049/l9_2046;
float l9_2051=0.0;
l9_2051=1.0-l9_2050;
float l9_2052=0.0;
float l9_2053=l9_2051;
float l9_2054=fwidth(l9_2053);
l9_2052=l9_2054;
float l9_2055=0.0;
l9_2055=l9_1994*(*sc_set0.UserUniforms).Port_Input1_N127;
float l9_2056=0.0;
l9_2056=(((l9_2052-(*sc_set0.UserUniforms).Port_RangeMinA_N135)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N135-(*sc_set0.UserUniforms).Port_RangeMinA_N135)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N135-l9_2055))+l9_2055;
float l9_2057=0.0;
l9_2057=l9_2051/l9_2056;
float l9_2058=0.0;
l9_2058=fast::clamp(l9_2057+0.001,(*sc_set0.UserUniforms).Port_Input1_N038+0.001,(*sc_set0.UserUniforms).Port_Input2_N038+0.001)-0.001;
float l9_2059=0.0;
l9_2059=l9_1721*l9_2058;
float l9_2060=0.0;
l9_2060=1.0-l9_2057;
float l9_2061=0.0;
l9_2061=fast::clamp(l9_2060+0.001,(*sc_set0.UserUniforms).Port_Input1_N264+0.001,(*sc_set0.UserUniforms).Port_Input2_N264+0.001)-0.001;
float l9_2062=0.0;
float l9_2063=l9_1733;
float l9_2064=(*sc_set0.UserUniforms).Port_RangeMinA_N039;
float l9_2065=(*sc_set0.UserUniforms).Port_RangeMaxA_N039;
float l9_2066=l9_2020;
float l9_2067=(*sc_set0.UserUniforms).Port_RangeMaxB_N039;
float l9_2068=(((l9_2063-l9_2064)/((l9_2065-l9_2064)+1e-06))*(l9_2067-l9_2066))+l9_2066;
float l9_2069;
if (l9_2067>l9_2066)
{
l9_2069=fast::clamp(l9_2068,l9_2066,l9_2067);
}
else
{
l9_2069=fast::clamp(l9_2068,l9_2067,l9_2066);
}
l9_2068=l9_2069;
l9_2062=l9_2068;
float l9_2070=0.0;
float l9_2071=l9_1841;
float l9_2072=(*sc_set0.UserUniforms).Port_RangeMinA_N042;
float l9_2073=(*sc_set0.UserUniforms).Port_RangeMaxA_N042;
float l9_2074=l9_2020;
float l9_2075=(*sc_set0.UserUniforms).Port_RangeMaxB_N042;
float l9_2076=(((l9_2071-l9_2072)/((l9_2073-l9_2072)+1e-06))*(l9_2075-l9_2074))+l9_2074;
float l9_2077;
if (l9_2075>l9_2074)
{
l9_2077=fast::clamp(l9_2076,l9_2074,l9_2075);
}
else
{
l9_2077=fast::clamp(l9_2076,l9_2075,l9_2074);
}
l9_2076=l9_2077;
l9_2070=l9_2076;
float2 l9_2078=float2(0.0);
l9_2078.x=l9_2062;
l9_2078.y=l9_2070;
float2 l9_2079=float2(0.0);
l9_2079=l9_2012-l9_2078;
float l9_2080=0.0;
float l9_2081=l9_2041;
float l9_2082=(*sc_set0.UserUniforms).Port_RangeMinA_N057;
float l9_2083=(*sc_set0.UserUniforms).Port_RangeMaxA_N057;
float l9_2084=(*sc_set0.UserUniforms).Port_RangeMinB_N057;
float l9_2085=(*sc_set0.UserUniforms).Port_RangeMaxB_N057;
float l9_2086=(((l9_2081-l9_2082)/((l9_2083-l9_2082)+1e-06))*(l9_2085-l9_2084))+l9_2084;
float l9_2087;
if (l9_2085>l9_2084)
{
l9_2087=fast::clamp(l9_2086,l9_2084,l9_2085);
}
else
{
l9_2087=fast::clamp(l9_2086,l9_2085,l9_2084);
}
l9_2086=l9_2087;
l9_2080=l9_2086;
float l9_2088=0.0;
l9_2088=(((l9_2013-(*sc_set0.UserUniforms).Port_RangeMinA_N101)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N101-(*sc_set0.UserUniforms).Port_RangeMinA_N101)+1e-06))*(l9_2080-(*sc_set0.UserUniforms).Port_RangeMinB_N101))+(*sc_set0.UserUniforms).Port_RangeMinB_N101;
float l9_2089=0.0;
float l9_2090=l9_2041;
float l9_2091=(*sc_set0.UserUniforms).Port_RangeMinA_N047;
float l9_2092=(*sc_set0.UserUniforms).Port_RangeMaxA_N047;
float l9_2093=l9_2088;
float l9_2094=(*sc_set0.UserUniforms).Port_RangeMaxB_N047;
float l9_2095=(((l9_2090-l9_2091)/((l9_2092-l9_2091)+1e-06))*(l9_2094-l9_2093))+l9_2093;
float l9_2096;
if (l9_2094>l9_2093)
{
l9_2096=fast::clamp(l9_2095,l9_2093,l9_2094);
}
else
{
l9_2096=fast::clamp(l9_2095,l9_2094,l9_2093);
}
l9_2095=l9_2096;
l9_2089=l9_2095;
float l9_2097=0.0;
l9_2097=abs(l9_2089);
float l9_2098=0.0;
l9_2098=fast::min(l9_2097,l9_2062);
float l9_2099=0.0;
l9_2099=fast::min(l9_2098,l9_2070);
float l9_2100=0.0;
l9_2100=fast::max(l9_2099,(*sc_set0.UserUniforms).Port_Input1_N051);
float2 l9_2101=float2(0.0);
l9_2101=l9_2079+float2(l9_2100);
float2 l9_2102=float2(0.0);
l9_2102=fast::max(l9_2101,(*sc_set0.UserUniforms).Port_Input1_N053);
float l9_2103=0.0;
l9_2103=length(l9_2102);
float l9_2104=0.0;
l9_2104=l9_2103/l9_2100;
float l9_2105=0.0;
l9_2105=1.0-l9_2104;
float l9_2106=0.0;
float l9_2107=l9_2105;
float l9_2108=fwidth(l9_2107);
l9_2106=l9_2108;
float l9_2109=0.0;
l9_2109=(((l9_2106-(*sc_set0.UserUniforms).Port_RangeMinA_N133)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N133-(*sc_set0.UserUniforms).Port_RangeMinA_N133)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N133-l9_1994))+l9_1994;
float l9_2110=0.0;
l9_2110=l9_2105/l9_2109;
float l9_2111=0.0;
l9_2111=fast::clamp(l9_2110+0.001,(*sc_set0.UserUniforms).Port_Input1_N064+0.001,(*sc_set0.UserUniforms).Port_Input2_N064+0.001)-0.001;
float l9_2112=0.0;
l9_2112=l9_2061*l9_2111;
float l9_2113=0.0;
l9_2113=fast::clamp(l9_2112+0.001,(*sc_set0.UserUniforms).Port_Input1_N066+0.001,(*sc_set0.UserUniforms).Port_Input2_N066+0.001)-0.001;
float l9_2114=0.0;
float l9_2115=(*sc_set0.UserUniforms).Port_Value0_N068;
float l9_2116=0.0;
float l9_2117=(*sc_set0.UserUniforms).Port_Default_N068;
float l9_2118;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_2118=l9_2115;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2119=0.0;
float l9_2120=(*sc_set0.UserUniforms).strokeAlpha;
l9_2119=l9_2120;
l9_2116=l9_2119;
l9_2118=l9_2116;
}
else
{
l9_2118=l9_2117;
}
}
l9_2114=l9_2118;
float l9_2121=0.0;
l9_2121=l9_2113*l9_2114;
float l9_2122=0.0;
l9_2122=l9_2059+l9_2121;
float l9_2123=0.0;
l9_2123=fast::clamp(l9_2122+0.001,(*sc_set0.UserUniforms).Port_Input1_N072+0.001,(*sc_set0.UserUniforms).Port_Input2_N072+0.001)-0.001;
float l9_2124=0.0;
float l9_2125=(*sc_set0.UserUniforms).Port_Value0_N123;
float l9_2126=0.0;
float l9_2127=(*sc_set0.UserUniforms).Port_Default_N123;
float l9_2128;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_2128=l9_2125;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_2129=0.0;
float l9_2130=(*sc_set0.UserUniforms).shadowAlpha;
l9_2129=l9_2130;
l9_2126=l9_2129;
l9_2128=l9_2126;
}
else
{
l9_2128=l9_2127;
}
}
l9_2124=l9_2128;
float l9_2131=0.0;
l9_2131=l9_2123*l9_2124;
float4 l9_2132=float4(0.0);
l9_2132=float4(l9_1711.xyz.x,l9_1711.xyz.y,l9_1711.xyz.z,l9_2132.w);
l9_2132.w=l9_2131;
float l9_2133=0.0;
l9_2133=l9_2132.w;
float l9_2134=0.0;
float l9_2135;
if ((int(Tweak_N124_tmp)!=0))
{
l9_2135=1.001;
}
else
{
l9_2135=0.001;
}
l9_2135-=0.001;
l9_2134=l9_2135;
float l9_2136=0.0;
l9_2136=l9_2133*l9_2134;
float4 l9_2137=float4(0.0);
l9_2137=float4(l9_2132.xyz.x,l9_2132.xyz.y,l9_2132.xyz.z,l9_2137.w);
l9_2137.w=l9_2136;
float l9_2138=0.0;
float l9_2139;
if ((int(innerCutout_tmp)!=0))
{
l9_2139=1.001;
}
else
{
l9_2139=0.001;
}
l9_2139-=0.001;
l9_2138=l9_2139;
float2 l9_2140=float2(0.0);
float2 l9_2141=l9_1950;
float l9_2142=l9_1985;
float2 l9_2143=(*sc_set0.UserUniforms).Port_Center_N113;
float l9_2144=sin(radians(l9_2142));
float l9_2145=cos(radians(l9_2142));
float2 l9_2146=l9_2141-l9_2143;
l9_2146=float2(dot(float2(l9_2145,l9_2144),l9_2146),dot(float2(-l9_2144,l9_2145),l9_2146))+l9_2143;
l9_2140=l9_2146;
float2 l9_2147=float2(0.0);
l9_2147=l9_2140*float2((*sc_set0.UserUniforms).Port_Input1_N089);
float2 l9_2148=float2(0.0);
l9_2148=l9_2147+float2((*sc_set0.UserUniforms).Port_Input1_N090);
float2 l9_2149=float2(0.0);
l9_2149=abs(l9_2148);
float2 l9_2150=float2(0.0);
l9_2150.x=l9_2022;
l9_2150.y=l9_2031;
float2 l9_2151=float2(0.0);
l9_2151=l9_2149-l9_2150;
float l9_2152=0.0;
l9_2152=abs(l9_2041);
float l9_2153=0.0;
l9_2153=fast::min(l9_2152,l9_2022);
float l9_2154=0.0;
l9_2154=fast::min(l9_2153,l9_2031);
float l9_2155=0.0;
l9_2155=fast::max(l9_2154,(*sc_set0.UserUniforms).Port_Input1_N103);
float2 l9_2156=float2(0.0);
l9_2156=l9_2151+float2(l9_2155);
float2 l9_2157=float2(0.0);
l9_2157=fast::max(l9_2156,(*sc_set0.UserUniforms).Port_Input1_N105);
float l9_2158=0.0;
l9_2158=length(l9_2157);
float l9_2159=0.0;
l9_2159=l9_2158/l9_2155;
float l9_2160=0.0;
l9_2160=1.0-l9_2159;
float l9_2161=0.0;
float l9_2162=l9_2160;
float l9_2163=fwidth(l9_2162);
l9_2161=l9_2163;
float l9_2164=0.0;
l9_2164=l9_2160/l9_2161;
float l9_2165=0.0;
l9_2165=fast::clamp(l9_2164+0.001,(*sc_set0.UserUniforms).Port_Input1_N112+0.001,(*sc_set0.UserUniforms).Port_Input2_N112+0.001)-0.001;
float l9_2166=0.0;
l9_2166=l9_2138*l9_2165;
float4 l9_2167=float4(0.0);
l9_2167=mix(l9_2137,float4((*sc_set0.UserUniforms).Port_Input1_N259),float4(l9_2166));
float4 l9_2168=float4(0.0);
float4 l9_2169=float4(0.0);
float4 l9_2170=float4(0.0);
float4 l9_2171=float4(0.0);
float4 l9_2172=(*sc_set0.UserUniforms).Port_Default_N149;
ssGlobals l9_2173=l9_1707;
float4 l9_2174;
if (NODE_161_DROPLIST_ITEM_tmp==0)
{
float4 l9_2175=float4(0.0);
float4 l9_2176=(*sc_set0.UserUniforms).shapeColor;
l9_2175=l9_2176;
float4 l9_2177=float4(0.0);
l9_2177=float4(l9_2175.x,l9_2175.y,l9_2175.z,1.0);
l9_2169=l9_2177;
l9_2174=l9_2169;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==1)
{
float2 l9_2178=float2(0.0);
l9_2178=l9_2173.Surface_UVCoord0;
float2 l9_2179=float2(0.0);
float2 l9_2180=(*sc_set0.UserUniforms).shapeScale;
l9_2179=l9_2180;
float2 l9_2181=float2(0.0);
float2 l9_2182=(*sc_set0.UserUniforms).shapeOffset;
l9_2181=l9_2182;
float2 l9_2183=float2(0.0);
l9_2183=(l9_2178*l9_2179)+l9_2181;
float4 l9_2184=float4(0.0);
int l9_2185;
if ((int(shapeTextureHasSwappedViews_tmp)!=0))
{
int l9_2186=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_2186=0;
}
else
{
l9_2186=in.varStereoViewID;
}
int l9_2187=l9_2186;
l9_2185=1-l9_2187;
}
else
{
int l9_2188=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_2188=0;
}
else
{
l9_2188=in.varStereoViewID;
}
int l9_2189=l9_2188;
l9_2185=l9_2189;
}
int l9_2190=l9_2185;
int l9_2191=shapeTextureLayout_tmp;
int l9_2192=l9_2190;
float2 l9_2193=l9_2183;
bool l9_2194=(int(SC_USE_UV_TRANSFORM_shapeTexture_tmp)!=0);
float3x3 l9_2195=(*sc_set0.UserUniforms).shapeTextureTransform;
int2 l9_2196=int2(SC_SOFTWARE_WRAP_MODE_U_shapeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_shapeTexture_tmp);
bool l9_2197=(int(SC_USE_UV_MIN_MAX_shapeTexture_tmp)!=0);
float4 l9_2198=(*sc_set0.UserUniforms).shapeTextureUvMinMax;
bool l9_2199=(int(SC_USE_CLAMP_TO_BORDER_shapeTexture_tmp)!=0);
float4 l9_2200=(*sc_set0.UserUniforms).shapeTextureBorderColor;
float l9_2201=0.0;
bool l9_2202=l9_2199&&(!l9_2197);
float l9_2203=1.0;
float l9_2204=l9_2193.x;
int l9_2205=l9_2196.x;
if (l9_2205==1)
{
l9_2204=fract(l9_2204);
}
else
{
if (l9_2205==2)
{
float l9_2206=fract(l9_2204);
float l9_2207=l9_2204-l9_2206;
float l9_2208=step(0.25,fract(l9_2207*0.5));
l9_2204=mix(l9_2206,1.0-l9_2206,fast::clamp(l9_2208,0.0,1.0));
}
}
l9_2193.x=l9_2204;
float l9_2209=l9_2193.y;
int l9_2210=l9_2196.y;
if (l9_2210==1)
{
l9_2209=fract(l9_2209);
}
else
{
if (l9_2210==2)
{
float l9_2211=fract(l9_2209);
float l9_2212=l9_2209-l9_2211;
float l9_2213=step(0.25,fract(l9_2212*0.5));
l9_2209=mix(l9_2211,1.0-l9_2211,fast::clamp(l9_2213,0.0,1.0));
}
}
l9_2193.y=l9_2209;
if (l9_2197)
{
bool l9_2214=l9_2199;
bool l9_2215;
if (l9_2214)
{
l9_2215=l9_2196.x==3;
}
else
{
l9_2215=l9_2214;
}
float l9_2216=l9_2193.x;
float l9_2217=l9_2198.x;
float l9_2218=l9_2198.z;
bool l9_2219=l9_2215;
float l9_2220=l9_2203;
float l9_2221=fast::clamp(l9_2216,l9_2217,l9_2218);
float l9_2222=step(abs(l9_2216-l9_2221),9.9999997e-06);
l9_2220*=(l9_2222+((1.0-float(l9_2219))*(1.0-l9_2222)));
l9_2216=l9_2221;
l9_2193.x=l9_2216;
l9_2203=l9_2220;
bool l9_2223=l9_2199;
bool l9_2224;
if (l9_2223)
{
l9_2224=l9_2196.y==3;
}
else
{
l9_2224=l9_2223;
}
float l9_2225=l9_2193.y;
float l9_2226=l9_2198.y;
float l9_2227=l9_2198.w;
bool l9_2228=l9_2224;
float l9_2229=l9_2203;
float l9_2230=fast::clamp(l9_2225,l9_2226,l9_2227);
float l9_2231=step(abs(l9_2225-l9_2230),9.9999997e-06);
l9_2229*=(l9_2231+((1.0-float(l9_2228))*(1.0-l9_2231)));
l9_2225=l9_2230;
l9_2193.y=l9_2225;
l9_2203=l9_2229;
}
float2 l9_2232=l9_2193;
bool l9_2233=l9_2194;
float3x3 l9_2234=l9_2195;
if (l9_2233)
{
l9_2232=float2((l9_2234*float3(l9_2232,1.0)).xy);
}
float2 l9_2235=l9_2232;
l9_2193=l9_2235;
float l9_2236=l9_2193.x;
int l9_2237=l9_2196.x;
bool l9_2238=l9_2202;
float l9_2239=l9_2203;
if ((l9_2237==0)||(l9_2237==3))
{
float l9_2240=l9_2236;
float l9_2241=0.0;
float l9_2242=1.0;
bool l9_2243=l9_2238;
float l9_2244=l9_2239;
float l9_2245=fast::clamp(l9_2240,l9_2241,l9_2242);
float l9_2246=step(abs(l9_2240-l9_2245),9.9999997e-06);
l9_2244*=(l9_2246+((1.0-float(l9_2243))*(1.0-l9_2246)));
l9_2240=l9_2245;
l9_2236=l9_2240;
l9_2239=l9_2244;
}
l9_2193.x=l9_2236;
l9_2203=l9_2239;
float l9_2247=l9_2193.y;
int l9_2248=l9_2196.y;
bool l9_2249=l9_2202;
float l9_2250=l9_2203;
if ((l9_2248==0)||(l9_2248==3))
{
float l9_2251=l9_2247;
float l9_2252=0.0;
float l9_2253=1.0;
bool l9_2254=l9_2249;
float l9_2255=l9_2250;
float l9_2256=fast::clamp(l9_2251,l9_2252,l9_2253);
float l9_2257=step(abs(l9_2251-l9_2256),9.9999997e-06);
l9_2255*=(l9_2257+((1.0-float(l9_2254))*(1.0-l9_2257)));
l9_2251=l9_2256;
l9_2247=l9_2251;
l9_2250=l9_2255;
}
l9_2193.y=l9_2247;
l9_2203=l9_2250;
float2 l9_2258=l9_2193;
int l9_2259=l9_2191;
int l9_2260=l9_2192;
float l9_2261=l9_2201;
float2 l9_2262=l9_2258;
int l9_2263=l9_2259;
int l9_2264=l9_2260;
float3 l9_2265=float3(0.0);
if (l9_2263==0)
{
l9_2265=float3(l9_2262,0.0);
}
else
{
if (l9_2263==1)
{
l9_2265=float3(l9_2262.x,(l9_2262.y*0.5)+(0.5-(float(l9_2264)*0.5)),0.0);
}
else
{
l9_2265=float3(l9_2262,float(l9_2264));
}
}
float3 l9_2266=l9_2265;
float3 l9_2267=l9_2266;
float4 l9_2268=sc_set0.shapeTexture.sample(sc_set0.shapeTextureSmpSC,l9_2267.xy,bias(l9_2261));
float4 l9_2269=l9_2268;
if (l9_2199)
{
l9_2269=mix(l9_2200,l9_2269,float4(l9_2203));
}
float4 l9_2270=l9_2269;
l9_2184=l9_2270;
float4 l9_2271=float4(0.0);
float4 l9_2272=(*sc_set0.UserUniforms).shapeColor;
l9_2271=l9_2272;
float4 l9_2273=float4(0.0);
l9_2273=l9_2184*l9_2271;
l9_2170=l9_2273;
l9_2174=l9_2170;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==2)
{
float4 l9_2274=float4(0.0);
float4 l9_2275=float4(0.0);
float4 l9_2276=float4(0.0);
float4 l9_2277=(*sc_set0.UserUniforms).Port_Default_N209;
ssGlobals l9_2278=l9_2173;
float4 l9_2279;
if (int((int(toQuadShapeGrad_tmp)!=0))==0)
{
float4 l9_2280=float4(0.0);
float4 l9_2281=(*sc_set0.UserUniforms).shapeGradColorA;
l9_2280=l9_2281;
float4 l9_2282=float4(0.0);
l9_2282=l9_2280;
float4 l9_2283=float4(0.0);
float4 l9_2284=(*sc_set0.UserUniforms).shapeGradColorB;
l9_2283=l9_2284;
float4 l9_2285=float4(0.0);
l9_2285=l9_2283;
float2 l9_2286=float2(0.0);
l9_2286=l9_2278.Surface_UVCoord0;
float2 l9_2287=float2(0.0);
l9_2287=(((l9_2286-float2((*sc_set0.UserUniforms).Port_RangeMinA_N175))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N175-(*sc_set0.UserUniforms).Port_RangeMinA_N175)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N175-(*sc_set0.UserUniforms).Port_RangeMinB_N175))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N175);
float2 l9_2288=float2(0.0);
float2 l9_2289=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_2288=l9_2289;
float2 l9_2290=float2(0.0);
l9_2290=l9_2288;
float2 l9_2291=float2(0.0);
l9_2291=((l9_2287-(*sc_set0.UserUniforms).Port_Center_N177)*l9_2290)+(*sc_set0.UserUniforms).Port_Center_N177;
float2 l9_2292=float2(0.0);
float2 l9_2293=(*sc_set0.UserUniforms).shapeGradPointA;
l9_2292=l9_2293;
float2 l9_2294=float2(0.0);
l9_2294=l9_2292;
float2 l9_2295=float2(0.0);
l9_2295=l9_2291-l9_2294;
float2 l9_2296=float2(0.0);
float2 l9_2297=(*sc_set0.UserUniforms).shapeGradPointB;
l9_2296=l9_2297;
float2 l9_2298=float2(0.0);
l9_2298=l9_2296;
float2 l9_2299=float2(0.0);
l9_2299=l9_2298-l9_2294;
float l9_2300=0.0;
l9_2300=dot(l9_2295,l9_2299);
float l9_2301=0.0;
l9_2301=dot(l9_2299,l9_2299);
float l9_2302=0.0;
l9_2302=l9_2300/l9_2301;
float l9_2303=0.0;
l9_2303=fast::clamp(l9_2302+0.001,(*sc_set0.UserUniforms).Port_Input1_N185+0.001,(*sc_set0.UserUniforms).Port_Input2_N185+0.001)-0.001;
float l9_2304=0.0;
l9_2304=smoothstep((*sc_set0.UserUniforms).Port_Input0_N186,(*sc_set0.UserUniforms).Port_Input1_N186,l9_2303);
float4 l9_2305=float4(0.0);
l9_2305=mix(l9_2282,l9_2285,float4(l9_2304));
float4 l9_2306=float4(0.0);
l9_2306=l9_2305;
l9_2275=l9_2306;
l9_2279=l9_2275;
}
else
{
if (int((int(toQuadShapeGrad_tmp)!=0))==1)
{
float4 l9_2307=float4(0.0);
float4 l9_2308=(*sc_set0.UserUniforms).shapeGradColorA;
l9_2307=l9_2308;
float4 l9_2309=float4(0.0);
l9_2309=l9_2307;
float4 l9_2310=float4(0.0);
float4 l9_2311=(*sc_set0.UserUniforms).shapeGradColorB;
l9_2310=l9_2311;
float4 l9_2312=float4(0.0);
l9_2312=l9_2310;
float2 l9_2313=float2(0.0);
l9_2313=l9_2278.Surface_UVCoord0;
float2 l9_2314=float2(0.0);
l9_2314=(((l9_2313-float2((*sc_set0.UserUniforms).Port_RangeMinA_N198))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N198-(*sc_set0.UserUniforms).Port_RangeMinA_N198)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N198-(*sc_set0.UserUniforms).Port_RangeMinB_N198))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N198);
float2 l9_2315=float2(0.0);
float2 l9_2316=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_2315=l9_2316;
float2 l9_2317=float2(0.0);
l9_2317=l9_2315;
float2 l9_2318=float2(0.0);
float2 l9_2319=(*sc_set0.UserUniforms).shapeQuadOffset;
l9_2318=l9_2319;
float2 l9_2320=float2(0.0);
l9_2320=l9_2318;
float2 l9_2321=float2(0.0);
l9_2321=(l9_2314*l9_2317)+l9_2320;
float l9_2322=0.0;
float l9_2323=0.0;
float2 l9_2324=l9_2321;
float l9_2325=l9_2324.x;
float l9_2326=l9_2324.y;
l9_2322=l9_2325;
l9_2323=l9_2326;
float4 l9_2327=float4(0.0);
l9_2327=mix(l9_2309,l9_2312,float4(l9_2322));
float4 l9_2328=float4(0.0);
float4 l9_2329=(*sc_set0.UserUniforms).shapeGradColorC;
l9_2328=l9_2329;
float4 l9_2330=float4(0.0);
l9_2330=l9_2328;
float4 l9_2331=float4(0.0);
float4 l9_2332=(*sc_set0.UserUniforms).shapeGradColorD;
l9_2331=l9_2332;
float4 l9_2333=float4(0.0);
l9_2333=l9_2331;
float4 l9_2334=float4(0.0);
l9_2334=mix(l9_2330,l9_2333,float4(l9_2322));
float4 l9_2335=float4(0.0);
l9_2335=mix(l9_2327,l9_2334,float4(l9_2323));
float4 l9_2336=float4(0.0);
l9_2336=l9_2335;
l9_2276=l9_2336;
l9_2279=l9_2276;
}
else
{
l9_2279=l9_2277;
}
}
l9_2274=l9_2279;
l9_2171=l9_2274;
l9_2174=l9_2171;
}
else
{
l9_2174=l9_2172;
}
}
}
l9_2168=l9_2174;
float l9_2337=0.0;
l9_2337=fast::clamp(l9_2164+0.001,(*sc_set0.UserUniforms).Port_Input1_N265+0.001,(*sc_set0.UserUniforms).Port_Input2_N265+0.001)-0.001;
float l9_2338=0.0;
l9_2338=1.0-l9_2337;
float2 l9_2339=float2(0.0);
l9_2339.x=l9_2062;
l9_2339.y=l9_2070;
float2 l9_2340=float2(0.0);
l9_2340=l9_2149-l9_2339;
float l9_2341=0.0;
l9_2341=abs(l9_2089);
float l9_2342=0.0;
l9_2342=fast::min(l9_2341,l9_2062);
float l9_2343=0.0;
l9_2343=fast::min(l9_2342,l9_2070);
float l9_2344=0.0;
l9_2344=fast::max(l9_2343,(*sc_set0.UserUniforms).Port_Input1_N098);
float2 l9_2345=float2(0.0);
l9_2345=l9_2340+float2(l9_2344);
float2 l9_2346=float2(0.0);
l9_2346=fast::max(l9_2345,(*sc_set0.UserUniforms).Port_Input1_N115);
float l9_2347=0.0;
l9_2347=length(l9_2346);
float l9_2348=0.0;
l9_2348=l9_2347/l9_2344;
float l9_2349=0.0;
l9_2349=1.0-l9_2348;
float l9_2350=0.0;
float l9_2351=l9_2349;
float l9_2352=fwidth(l9_2351);
l9_2350=l9_2352;
float l9_2353=0.0;
l9_2353=l9_2349/l9_2350;
float l9_2354=0.0;
l9_2354=fast::clamp(l9_2353+0.001,(*sc_set0.UserUniforms).Port_Input1_N142+0.001,(*sc_set0.UserUniforms).Port_Input2_N142+0.001)-0.001;
float l9_2355=0.0;
l9_2355=l9_2338*l9_2354;
float l9_2356=0.0;
l9_2356=fast::clamp(l9_2355+0.001,(*sc_set0.UserUniforms).Port_Input1_N144+0.001,(*sc_set0.UserUniforms).Port_Input2_N144+0.001)-0.001;
float l9_2357=0.0;
l9_2357=l9_2356*l9_2114;
float l9_2358=0.0;
l9_2358=l9_2165*l9_1721;
float l9_2359=0.0;
l9_2359=l9_2357+l9_2358;
float l9_2360=0.0;
l9_2360=fast::max(l9_2357,l9_2358);
float l9_2361=0.0;
l9_2361=l9_2359-l9_2360;
float l9_2362=0.0;
l9_2362=l9_2361+l9_2358;
float l9_2363=0.0;
float l9_2364;
if ((int(shapeColorInvert_tmp)!=0))
{
l9_2364=1.001;
}
else
{
l9_2364=0.001;
}
l9_2364-=0.001;
l9_2363=l9_2364;
float l9_2365=0.0;
l9_2365=1.0-l9_2363;
float l9_2366=0.0;
float l9_2367=l9_2362;
float l9_2368=(*sc_set0.UserUniforms).Port_RangeMinA_N171;
float l9_2369=(*sc_set0.UserUniforms).Port_RangeMaxA_N171;
float l9_2370=l9_2365;
float l9_2371=l9_2363;
float l9_2372=(((l9_2367-l9_2368)/((l9_2369-l9_2368)+1e-06))*(l9_2371-l9_2370))+l9_2370;
float l9_2373;
if (l9_2371>l9_2370)
{
l9_2373=fast::clamp(l9_2372,l9_2370,l9_2371);
}
else
{
l9_2373=fast::clamp(l9_2372,l9_2371,l9_2370);
}
l9_2372=l9_2373;
l9_2366=l9_2372;
float4 l9_2374=float4(0.0);
l9_2374=mix(l9_2167,l9_2168,float4(l9_2366));
float4 l9_2375=float4(0.0);
float4 l9_2376=(*sc_set0.UserUniforms).Port_Value0_N325;
float4 l9_2377=float4(0.0);
float4 l9_2378=(*sc_set0.UserUniforms).Port_Default_N325;
ssGlobals l9_2379=l9_1707;
float4 l9_2380;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_2380=l9_2376;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float4 l9_2381=float4(0.0);
float4 l9_2382=float4(0.0);
float4 l9_2383=float4(0.0);
float4 l9_2384=float4(0.0);
float4 l9_2385=(*sc_set0.UserUniforms).Port_Default_N324;
ssGlobals l9_2386=l9_2379;
float4 l9_2387;
if (NODE_164_DROPLIST_ITEM_tmp==0)
{
float4 l9_2388=float4(0.0);
float4 l9_2389=(*sc_set0.UserUniforms).strokeColor;
l9_2388=l9_2389;
l9_2382=l9_2388;
l9_2387=l9_2382;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==1)
{
float2 l9_2390=float2(0.0);
l9_2390=l9_2386.Surface_UVCoord0;
float2 l9_2391=float2(0.0);
float2 l9_2392=(*sc_set0.UserUniforms).strokeScale;
l9_2391=l9_2392;
float2 l9_2393=float2(0.0);
float2 l9_2394=(*sc_set0.UserUniforms).strokeOffset;
l9_2393=l9_2394;
float2 l9_2395=float2(0.0);
l9_2395=(l9_2390*l9_2391)+l9_2393;
float4 l9_2396=float4(0.0);
int l9_2397;
if ((int(strokeTextureHasSwappedViews_tmp)!=0))
{
int l9_2398=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_2398=0;
}
else
{
l9_2398=in.varStereoViewID;
}
int l9_2399=l9_2398;
l9_2397=1-l9_2399;
}
else
{
int l9_2400=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_2400=0;
}
else
{
l9_2400=in.varStereoViewID;
}
int l9_2401=l9_2400;
l9_2397=l9_2401;
}
int l9_2402=l9_2397;
int l9_2403=strokeTextureLayout_tmp;
int l9_2404=l9_2402;
float2 l9_2405=l9_2395;
bool l9_2406=(int(SC_USE_UV_TRANSFORM_strokeTexture_tmp)!=0);
float3x3 l9_2407=(*sc_set0.UserUniforms).strokeTextureTransform;
int2 l9_2408=int2(SC_SOFTWARE_WRAP_MODE_U_strokeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_strokeTexture_tmp);
bool l9_2409=(int(SC_USE_UV_MIN_MAX_strokeTexture_tmp)!=0);
float4 l9_2410=(*sc_set0.UserUniforms).strokeTextureUvMinMax;
bool l9_2411=(int(SC_USE_CLAMP_TO_BORDER_strokeTexture_tmp)!=0);
float4 l9_2412=(*sc_set0.UserUniforms).strokeTextureBorderColor;
float l9_2413=0.0;
bool l9_2414=l9_2411&&(!l9_2409);
float l9_2415=1.0;
float l9_2416=l9_2405.x;
int l9_2417=l9_2408.x;
if (l9_2417==1)
{
l9_2416=fract(l9_2416);
}
else
{
if (l9_2417==2)
{
float l9_2418=fract(l9_2416);
float l9_2419=l9_2416-l9_2418;
float l9_2420=step(0.25,fract(l9_2419*0.5));
l9_2416=mix(l9_2418,1.0-l9_2418,fast::clamp(l9_2420,0.0,1.0));
}
}
l9_2405.x=l9_2416;
float l9_2421=l9_2405.y;
int l9_2422=l9_2408.y;
if (l9_2422==1)
{
l9_2421=fract(l9_2421);
}
else
{
if (l9_2422==2)
{
float l9_2423=fract(l9_2421);
float l9_2424=l9_2421-l9_2423;
float l9_2425=step(0.25,fract(l9_2424*0.5));
l9_2421=mix(l9_2423,1.0-l9_2423,fast::clamp(l9_2425,0.0,1.0));
}
}
l9_2405.y=l9_2421;
if (l9_2409)
{
bool l9_2426=l9_2411;
bool l9_2427;
if (l9_2426)
{
l9_2427=l9_2408.x==3;
}
else
{
l9_2427=l9_2426;
}
float l9_2428=l9_2405.x;
float l9_2429=l9_2410.x;
float l9_2430=l9_2410.z;
bool l9_2431=l9_2427;
float l9_2432=l9_2415;
float l9_2433=fast::clamp(l9_2428,l9_2429,l9_2430);
float l9_2434=step(abs(l9_2428-l9_2433),9.9999997e-06);
l9_2432*=(l9_2434+((1.0-float(l9_2431))*(1.0-l9_2434)));
l9_2428=l9_2433;
l9_2405.x=l9_2428;
l9_2415=l9_2432;
bool l9_2435=l9_2411;
bool l9_2436;
if (l9_2435)
{
l9_2436=l9_2408.y==3;
}
else
{
l9_2436=l9_2435;
}
float l9_2437=l9_2405.y;
float l9_2438=l9_2410.y;
float l9_2439=l9_2410.w;
bool l9_2440=l9_2436;
float l9_2441=l9_2415;
float l9_2442=fast::clamp(l9_2437,l9_2438,l9_2439);
float l9_2443=step(abs(l9_2437-l9_2442),9.9999997e-06);
l9_2441*=(l9_2443+((1.0-float(l9_2440))*(1.0-l9_2443)));
l9_2437=l9_2442;
l9_2405.y=l9_2437;
l9_2415=l9_2441;
}
float2 l9_2444=l9_2405;
bool l9_2445=l9_2406;
float3x3 l9_2446=l9_2407;
if (l9_2445)
{
l9_2444=float2((l9_2446*float3(l9_2444,1.0)).xy);
}
float2 l9_2447=l9_2444;
l9_2405=l9_2447;
float l9_2448=l9_2405.x;
int l9_2449=l9_2408.x;
bool l9_2450=l9_2414;
float l9_2451=l9_2415;
if ((l9_2449==0)||(l9_2449==3))
{
float l9_2452=l9_2448;
float l9_2453=0.0;
float l9_2454=1.0;
bool l9_2455=l9_2450;
float l9_2456=l9_2451;
float l9_2457=fast::clamp(l9_2452,l9_2453,l9_2454);
float l9_2458=step(abs(l9_2452-l9_2457),9.9999997e-06);
l9_2456*=(l9_2458+((1.0-float(l9_2455))*(1.0-l9_2458)));
l9_2452=l9_2457;
l9_2448=l9_2452;
l9_2451=l9_2456;
}
l9_2405.x=l9_2448;
l9_2415=l9_2451;
float l9_2459=l9_2405.y;
int l9_2460=l9_2408.y;
bool l9_2461=l9_2414;
float l9_2462=l9_2415;
if ((l9_2460==0)||(l9_2460==3))
{
float l9_2463=l9_2459;
float l9_2464=0.0;
float l9_2465=1.0;
bool l9_2466=l9_2461;
float l9_2467=l9_2462;
float l9_2468=fast::clamp(l9_2463,l9_2464,l9_2465);
float l9_2469=step(abs(l9_2463-l9_2468),9.9999997e-06);
l9_2467*=(l9_2469+((1.0-float(l9_2466))*(1.0-l9_2469)));
l9_2463=l9_2468;
l9_2459=l9_2463;
l9_2462=l9_2467;
}
l9_2405.y=l9_2459;
l9_2415=l9_2462;
float2 l9_2470=l9_2405;
int l9_2471=l9_2403;
int l9_2472=l9_2404;
float l9_2473=l9_2413;
float2 l9_2474=l9_2470;
int l9_2475=l9_2471;
int l9_2476=l9_2472;
float3 l9_2477=float3(0.0);
if (l9_2475==0)
{
l9_2477=float3(l9_2474,0.0);
}
else
{
if (l9_2475==1)
{
l9_2477=float3(l9_2474.x,(l9_2474.y*0.5)+(0.5-(float(l9_2476)*0.5)),0.0);
}
else
{
l9_2477=float3(l9_2474,float(l9_2476));
}
}
float3 l9_2478=l9_2477;
float3 l9_2479=l9_2478;
float4 l9_2480=sc_set0.strokeTexture.sample(sc_set0.strokeTextureSmpSC,l9_2479.xy,bias(l9_2473));
float4 l9_2481=l9_2480;
if (l9_2411)
{
l9_2481=mix(l9_2412,l9_2481,float4(l9_2415));
}
float4 l9_2482=l9_2481;
l9_2396=l9_2482;
float4 l9_2483=float4(0.0);
float4 l9_2484=(*sc_set0.UserUniforms).strokeColor;
l9_2483=l9_2484;
float4 l9_2485=float4(0.0);
l9_2485=l9_2396*l9_2483;
l9_2383=l9_2485;
l9_2387=l9_2383;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==2)
{
float4 l9_2486=float4(0.0);
float4 l9_2487=float4(0.0);
float4 l9_2488=float4(0.0);
float4 l9_2489=(*sc_set0.UserUniforms).Port_Default_N323;
ssGlobals l9_2490=l9_2386;
float4 l9_2491;
if (int((int(toQuadStrokeGrad_tmp)!=0))==0)
{
float4 l9_2492=float4(0.0);
float4 l9_2493=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_2492=l9_2493;
float4 l9_2494=float4(0.0);
l9_2494=l9_2492;
float4 l9_2495=float4(0.0);
float4 l9_2496=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_2495=l9_2496;
float4 l9_2497=float4(0.0);
l9_2497=l9_2495;
float2 l9_2498=float2(0.0);
l9_2498=l9_2490.Surface_UVCoord0;
float2 l9_2499=float2(0.0);
l9_2499=(((l9_2498-float2((*sc_set0.UserUniforms).Port_RangeMinA_N231))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N231-(*sc_set0.UserUniforms).Port_RangeMinA_N231)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N231-(*sc_set0.UserUniforms).Port_RangeMinB_N231))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N231);
float2 l9_2500=float2(0.0);
float2 l9_2501=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_2500=l9_2501;
float2 l9_2502=float2(0.0);
l9_2502=l9_2500;
float2 l9_2503=float2(0.0);
l9_2503=((l9_2499-(*sc_set0.UserUniforms).Port_Center_N233)*l9_2502)+(*sc_set0.UserUniforms).Port_Center_N233;
float2 l9_2504=float2(0.0);
float2 l9_2505=(*sc_set0.UserUniforms).shapeGradPointA2;
l9_2504=l9_2505;
float2 l9_2506=float2(0.0);
l9_2506=l9_2504;
float2 l9_2507=float2(0.0);
l9_2507=l9_2503-l9_2506;
float2 l9_2508=float2(0.0);
float2 l9_2509=(*sc_set0.UserUniforms).shapeGradPointB2;
l9_2508=l9_2509;
float2 l9_2510=float2(0.0);
l9_2510=l9_2508;
float2 l9_2511=float2(0.0);
l9_2511=l9_2510-l9_2506;
float l9_2512=0.0;
l9_2512=dot(l9_2507,l9_2511);
float l9_2513=0.0;
l9_2513=dot(l9_2511,l9_2511);
float l9_2514=0.0;
l9_2514=l9_2512/l9_2513;
float l9_2515=0.0;
l9_2515=fast::clamp(l9_2514+0.001,(*sc_set0.UserUniforms).Port_Input1_N241+0.001,(*sc_set0.UserUniforms).Port_Input2_N241+0.001)-0.001;
float l9_2516=0.0;
l9_2516=smoothstep((*sc_set0.UserUniforms).Port_Input0_N242,(*sc_set0.UserUniforms).Port_Input1_N242,l9_2515);
float4 l9_2517=float4(0.0);
l9_2517=mix(l9_2494,l9_2497,float4(l9_2516));
float4 l9_2518=float4(0.0);
l9_2518=l9_2517;
l9_2487=l9_2518;
l9_2491=l9_2487;
}
else
{
if (int((int(toQuadStrokeGrad_tmp)!=0))==1)
{
float4 l9_2519=float4(0.0);
float4 l9_2520=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_2519=l9_2520;
float4 l9_2521=float4(0.0);
l9_2521=l9_2519;
float4 l9_2522=float4(0.0);
float4 l9_2523=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_2522=l9_2523;
float4 l9_2524=float4(0.0);
l9_2524=l9_2522;
float2 l9_2525=float2(0.0);
l9_2525=l9_2490.Surface_UVCoord0;
float2 l9_2526=float2(0.0);
l9_2526=(((l9_2525-float2((*sc_set0.UserUniforms).Port_RangeMinA_N252))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N252-(*sc_set0.UserUniforms).Port_RangeMinA_N252)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N252-(*sc_set0.UserUniforms).Port_RangeMinB_N252))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N252);
float2 l9_2527=float2(0.0);
float2 l9_2528=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_2527=l9_2528;
float2 l9_2529=float2(0.0);
l9_2529=l9_2527;
float2 l9_2530=float2(0.0);
float2 l9_2531=(*sc_set0.UserUniforms).shapeQuadOffset2;
l9_2530=l9_2531;
float2 l9_2532=float2(0.0);
l9_2532=l9_2530;
float2 l9_2533=float2(0.0);
l9_2533=(l9_2526*l9_2529)+l9_2532;
float l9_2534=0.0;
float l9_2535=0.0;
float2 l9_2536=l9_2533;
float l9_2537=l9_2536.x;
float l9_2538=l9_2536.y;
l9_2534=l9_2537;
l9_2535=l9_2538;
float4 l9_2539=float4(0.0);
l9_2539=mix(l9_2521,l9_2524,float4(l9_2534));
float4 l9_2540=float4(0.0);
float4 l9_2541=(*sc_set0.UserUniforms).shapeGradColorC2;
l9_2540=l9_2541;
float4 l9_2542=float4(0.0);
l9_2542=l9_2540;
float4 l9_2543=float4(0.0);
float4 l9_2544=(*sc_set0.UserUniforms).shapeGradColorD2;
l9_2543=l9_2544;
float4 l9_2545=float4(0.0);
l9_2545=l9_2543;
float4 l9_2546=float4(0.0);
l9_2546=mix(l9_2542,l9_2545,float4(l9_2534));
float4 l9_2547=float4(0.0);
l9_2547=mix(l9_2539,l9_2546,float4(l9_2535));
float4 l9_2548=float4(0.0);
l9_2548=l9_2547;
l9_2488=l9_2548;
l9_2491=l9_2488;
}
else
{
l9_2491=l9_2489;
}
}
l9_2486=l9_2491;
l9_2384=l9_2486;
l9_2387=l9_2384;
}
else
{
l9_2387=l9_2385;
}
}
}
l9_2381=l9_2387;
l9_2377=l9_2381;
l9_2380=l9_2377;
}
else
{
l9_2380=l9_2378;
}
}
l9_2375=l9_2380;
float4 l9_2549=float4(0.0);
l9_2549=mix(l9_2374,l9_2375,float4(l9_2357));
l9_1705=l9_2549;
l9_1710=l9_1705;
}
else
{
float4 l9_2550=float4(0.0);
float4 l9_2551=float4(0.0);
float4 l9_2552=float4(0.0);
float4 l9_2553=(*sc_set0.UserUniforms).Port_Default_N126;
float4 l9_2554;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
float l9_2555=0.0;
float l9_2556;
if ((int(Tweak_N124_tmp)!=0))
{
l9_2556=1.001;
}
else
{
l9_2556=0.001;
}
l9_2556-=0.001;
l9_2555=l9_2556;
float l9_2557=0.0;
l9_2557=(((l9_2555-(*sc_set0.UserUniforms).Port_RangeMinA_N136)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N136-(*sc_set0.UserUniforms).Port_RangeMinA_N136)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N136-(*sc_set0.UserUniforms).Port_RangeMinB_N136))+(*sc_set0.UserUniforms).Port_RangeMinB_N136;
l9_2551=float4(l9_2557);
l9_2554=l9_2551;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float4 l9_2558=float4(0.0);
float4 l9_2559=(*sc_set0.UserUniforms).shadowColor;
l9_2558=l9_2559;
l9_2552=l9_2558;
l9_2554=l9_2552;
}
else
{
l9_2554=l9_2553;
}
}
l9_2550=l9_2554;
float l9_2560=0.0;
float l9_2561=(*sc_set0.UserUniforms).shapeAlpha;
l9_2560=l9_2561;
float2 l9_2562=float2(0.0);
l9_2562=l9_1707.Surface_UVCoord0;
float4 l9_2563=float4(0.0);
float4 l9_2564=(*sc_set0.UserUniforms).Port_Value0_N154;
float4 l9_2565=float4(1.0);
float4 l9_2566=(*sc_set0.UserUniforms).Port_Default_N154;
float4 l9_2567;
if (int((int(shapeAspectFix_tmp)!=0))==0)
{
l9_2567=l9_2564;
}
else
{
if (int((int(shapeAspectFix_tmp)!=0))==1)
{
float l9_2568=0.0;
l9_2568=(*sc_set0.UserUniforms).sc_Camera.aspect;
float l9_2569=0.0;
l9_2569=1.0/l9_2568;
float2 l9_2570=float2(0.0);
l9_2570.x=(*sc_set0.UserUniforms).Port_Value1_N157;
l9_2570.y=l9_2569;
l9_2565=float4(l9_2570,0.0,0.0);
l9_2567=l9_2565;
}
else
{
l9_2567=l9_2566;
}
}
l9_2563=l9_2567;
float2 l9_2571=float2(0.0);
l9_2571=(l9_2562*l9_2563.xy)+(*sc_set0.UserUniforms).Port_Input2_N148;
float l9_2572=0.0;
float l9_2573=(*sc_set0.UserUniforms).shapeWidthX;
l9_2572=l9_2573;
float l9_2574=0.0;
l9_2574=l9_2572;
float l9_2575=0.0;
float l9_2576=0.0;
float l9_2577=(*sc_set0.UserUniforms).Port_Value0_N287;
float l9_2578=0.0;
float l9_2579=(*sc_set0.UserUniforms).Port_Default_N287;
float l9_2580=0.0;
float l9_2581=float((*sc_set0.UserUniforms).xRightPin!=0);
l9_2580=l9_2581;
float l9_2582=0.0;
l9_2582=l9_2580;
l9_2576=l9_2582;
l9_2576=floor(l9_2576);
float l9_2583;
if (l9_2576==0.0)
{
l9_2583=l9_2577;
}
else
{
if (l9_2576==1.0)
{
float l9_2584=0.0;
float l9_2585=0.0;
float l9_2586=0.0;
float l9_2587=(*sc_set0.UserUniforms).Port_Default_N294;
float l9_2588;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_2589=0.0;
float l9_2590=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_2591=l9_2590+0.001;
l9_2591-=0.001;
l9_2589=l9_2591;
l9_2585=l9_2589;
l9_2588=l9_2585;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2592=0.0;
float l9_2593=(*sc_set0.UserUniforms).strokeThickness;
l9_2592=l9_2593;
float l9_2594=0.0;
l9_2594=l9_2592;
float l9_2595=0.0;
float l9_2596=l9_2594;
float l9_2597=(*sc_set0.UserUniforms).Port_RangeMinA_N276;
float l9_2598=(*sc_set0.UserUniforms).Port_RangeMaxA_N276;
float l9_2599=(*sc_set0.UserUniforms).Port_RangeMinB_N276;
float l9_2600=(*sc_set0.UserUniforms).Port_RangeMaxB_N276;
float l9_2601=(((l9_2596-l9_2597)/((l9_2598-l9_2597)+1e-06))*(l9_2600-l9_2599))+l9_2599;
float l9_2602;
if (l9_2600>l9_2599)
{
l9_2602=fast::clamp(l9_2601,l9_2599,l9_2600);
}
else
{
l9_2602=fast::clamp(l9_2601,l9_2600,l9_2599);
}
l9_2601=l9_2602;
l9_2595=l9_2601;
l9_2586=l9_2595;
l9_2588=l9_2586;
}
else
{
l9_2588=l9_2587;
}
}
l9_2584=l9_2588;
l9_2578=l9_2584;
l9_2583=l9_2578;
}
else
{
l9_2583=l9_2579;
}
}
l9_2575=l9_2583;
float l9_2603=0.0;
float l9_2604=0.0;
float l9_2605=(*sc_set0.UserUniforms).Port_Value0_N281;
float l9_2606=0.0;
float l9_2607=(*sc_set0.UserUniforms).Port_Default_N281;
float l9_2608=0.0;
float l9_2609=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_2608=l9_2609;
float l9_2610=0.0;
l9_2610=l9_2608;
l9_2604=l9_2610;
l9_2604=floor(l9_2604);
float l9_2611;
if (l9_2604==0.0)
{
l9_2611=l9_2605;
}
else
{
if (l9_2604==1.0)
{
float l9_2612=0.0;
float l9_2613=0.0;
float l9_2614=0.0;
float l9_2615=(*sc_set0.UserUniforms).Port_Default_N296;
float l9_2616;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_2617=0.0;
float l9_2618=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_2619=l9_2618+0.001;
l9_2619-=0.001;
l9_2617=l9_2619;
l9_2613=l9_2617;
l9_2616=l9_2613;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2620=0.0;
float l9_2621=(*sc_set0.UserUniforms).strokeThickness;
l9_2620=l9_2621;
float l9_2622=0.0;
l9_2622=l9_2620;
float l9_2623=0.0;
float l9_2624=l9_2622;
float l9_2625=(*sc_set0.UserUniforms).Port_RangeMinA_N295;
float l9_2626=(*sc_set0.UserUniforms).Port_RangeMaxA_N295;
float l9_2627=(*sc_set0.UserUniforms).Port_RangeMinB_N295;
float l9_2628=(*sc_set0.UserUniforms).Port_RangeMaxB_N295;
float l9_2629=(((l9_2624-l9_2625)/((l9_2626-l9_2625)+1e-06))*(l9_2628-l9_2627))+l9_2627;
float l9_2630;
if (l9_2628>l9_2627)
{
l9_2630=fast::clamp(l9_2629,l9_2627,l9_2628);
}
else
{
l9_2630=fast::clamp(l9_2629,l9_2628,l9_2627);
}
l9_2629=l9_2630;
l9_2623=l9_2629;
l9_2614=l9_2623;
l9_2616=l9_2614;
}
else
{
l9_2616=l9_2615;
}
}
l9_2612=l9_2616;
l9_2606=l9_2612;
l9_2611=l9_2606;
}
else
{
l9_2611=l9_2607;
}
}
l9_2603=l9_2611;
float l9_2631=0.0;
float l9_2632=l9_2574;
float l9_2633=(*sc_set0.UserUniforms).Port_RangeMinA_N268;
float l9_2634=(*sc_set0.UserUniforms).Port_RangeMaxA_N268;
float l9_2635=l9_2575;
float l9_2636=l9_2603;
float l9_2637=(((l9_2632-l9_2633)/((l9_2634-l9_2633)+1e-06))*(l9_2636-l9_2635))+l9_2635;
float l9_2638;
if (l9_2636>l9_2635)
{
l9_2638=fast::clamp(l9_2637,l9_2635,l9_2636);
}
else
{
l9_2638=fast::clamp(l9_2637,l9_2636,l9_2635);
}
l9_2637=l9_2638;
l9_2631=l9_2637;
float l9_2639=0.0;
float l9_2640=(*sc_set0.UserUniforms).xOffset;
l9_2639=l9_2640;
float l9_2641=0.0;
l9_2641=l9_2639;
float l9_2642=0.0;
float l9_2643=0.0;
float l9_2644=(*sc_set0.UserUniforms).Port_Value0_N282;
float l9_2645=(*sc_set0.UserUniforms).Port_Value1_N282;
float l9_2646=(*sc_set0.UserUniforms).Port_Default_N282;
float l9_2647=0.0;
float l9_2648=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_2647=l9_2648;
float l9_2649=0.0;
l9_2649=l9_2647;
l9_2643=l9_2649;
l9_2643=floor(l9_2643);
float l9_2650;
if (l9_2643==0.0)
{
l9_2650=l9_2644;
}
else
{
if (l9_2643==1.0)
{
l9_2650=l9_2645;
}
else
{
l9_2650=l9_2646;
}
}
l9_2642=l9_2650;
float l9_2651=0.0;
l9_2651=l9_2641+l9_2642;
float l9_2652=0.0;
l9_2652=1.0-l9_2651;
float l9_2653=0.0;
float l9_2654=(*sc_set0.UserUniforms).Port_Value0_N308;
float l9_2655=0.0;
float l9_2656=(*sc_set0.UserUniforms).Port_Default_N308;
float l9_2657;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_2657=l9_2654;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2658=0.0;
float l9_2659=0.0;
float l9_2660=(*sc_set0.UserUniforms).Port_Value0_N304;
float l9_2661=0.0;
float l9_2662=(*sc_set0.UserUniforms).Port_Default_N304;
float l9_2663=0.0;
float l9_2664=float((*sc_set0.UserUniforms).xLeftPin!=0);
l9_2663=l9_2664;
float l9_2665=0.0;
l9_2665=l9_2663;
l9_2659=l9_2665;
l9_2659=floor(l9_2659);
float l9_2666;
if (l9_2659==0.0)
{
l9_2666=l9_2660;
}
else
{
if (l9_2659==1.0)
{
float l9_2667=0.0;
float l9_2668=(*sc_set0.UserUniforms).strokeThickness;
l9_2667=l9_2668;
float l9_2669=0.0;
l9_2669=l9_2667;
float l9_2670=0.0;
float l9_2671=l9_2669;
float l9_2672=(*sc_set0.UserUniforms).Port_RangeMinA_N303;
float l9_2673=(*sc_set0.UserUniforms).Port_RangeMaxA_N303;
float l9_2674=(*sc_set0.UserUniforms).Port_RangeMinB_N303;
float l9_2675=(*sc_set0.UserUniforms).Port_RangeMaxB_N303;
float l9_2676=(((l9_2671-l9_2672)/((l9_2673-l9_2672)+1e-06))*(l9_2675-l9_2674))+l9_2674;
float l9_2677;
if (l9_2675>l9_2674)
{
l9_2677=fast::clamp(l9_2676,l9_2674,l9_2675);
}
else
{
l9_2677=fast::clamp(l9_2676,l9_2675,l9_2674);
}
l9_2676=l9_2677;
l9_2670=l9_2676;
l9_2661=l9_2670;
l9_2666=l9_2661;
}
else
{
l9_2666=l9_2662;
}
}
l9_2658=l9_2666;
l9_2655=l9_2658;
l9_2657=l9_2655;
}
else
{
l9_2657=l9_2656;
}
}
l9_2653=l9_2657;
float l9_2678=0.0;
l9_2678=l9_2652+l9_2653;
float l9_2679=0.0;
l9_2679=l9_2631+l9_2678;
float l9_2680=0.0;
float l9_2681=(*sc_set0.UserUniforms).shapeHeightY;
l9_2680=l9_2681;
float l9_2682=0.0;
l9_2682=l9_2680;
float l9_2683=0.0;
float l9_2684=0.0;
float l9_2685=(*sc_set0.UserUniforms).Port_Value0_N289;
float l9_2686=0.0;
float l9_2687=(*sc_set0.UserUniforms).Port_Default_N289;
float l9_2688=0.0;
float l9_2689=float((*sc_set0.UserUniforms).yUpPin!=0);
l9_2688=l9_2689;
float l9_2690=0.0;
l9_2690=l9_2688;
l9_2684=l9_2690;
l9_2684=floor(l9_2684);
float l9_2691;
if (l9_2684==0.0)
{
l9_2691=l9_2685;
}
else
{
if (l9_2684==1.0)
{
float l9_2692=0.0;
float l9_2693=0.0;
float l9_2694=0.0;
float l9_2695=(*sc_set0.UserUniforms).Port_Default_N297;
float l9_2696;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_2697=0.0;
float l9_2698=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_2699=l9_2698+0.001;
l9_2699-=0.001;
l9_2697=l9_2699;
l9_2693=l9_2697;
l9_2696=l9_2693;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2700=0.0;
float l9_2701=(*sc_set0.UserUniforms).strokeThickness;
l9_2700=l9_2701;
float l9_2702=0.0;
l9_2702=l9_2700;
float l9_2703=0.0;
float l9_2704=l9_2702;
float l9_2705=(*sc_set0.UserUniforms).Port_RangeMinA_N299;
float l9_2706=(*sc_set0.UserUniforms).Port_RangeMaxA_N299;
float l9_2707=(*sc_set0.UserUniforms).Port_RangeMinB_N299;
float l9_2708=(*sc_set0.UserUniforms).Port_RangeMaxB_N299;
float l9_2709=(((l9_2704-l9_2705)/((l9_2706-l9_2705)+1e-06))*(l9_2708-l9_2707))+l9_2707;
float l9_2710;
if (l9_2708>l9_2707)
{
l9_2710=fast::clamp(l9_2709,l9_2707,l9_2708);
}
else
{
l9_2710=fast::clamp(l9_2709,l9_2708,l9_2707);
}
l9_2709=l9_2710;
l9_2703=l9_2709;
l9_2694=l9_2703;
l9_2696=l9_2694;
}
else
{
l9_2696=l9_2695;
}
}
l9_2692=l9_2696;
l9_2686=l9_2692;
l9_2691=l9_2686;
}
else
{
l9_2691=l9_2687;
}
}
l9_2683=l9_2691;
float l9_2711=0.0;
float l9_2712=0.0;
float l9_2713=(*sc_set0.UserUniforms).Port_Value0_N286;
float l9_2714=0.0;
float l9_2715=(*sc_set0.UserUniforms).Port_Default_N286;
float l9_2716=0.0;
float l9_2717=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_2716=l9_2717;
float l9_2718=0.0;
l9_2718=l9_2716;
l9_2712=l9_2718;
l9_2712=floor(l9_2712);
float l9_2719;
if (l9_2712==0.0)
{
l9_2719=l9_2713;
}
else
{
if (l9_2712==1.0)
{
float l9_2720=0.0;
float l9_2721=0.0;
float l9_2722=0.0;
float l9_2723=(*sc_set0.UserUniforms).Port_Default_N298;
float l9_2724;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
float l9_2725=0.0;
float l9_2726=(*sc_set0.UserUniforms).Port_Value_N288;
float l9_2727=l9_2726+0.001;
l9_2727-=0.001;
l9_2725=l9_2727;
l9_2721=l9_2725;
l9_2724=l9_2721;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2728=0.0;
float l9_2729=(*sc_set0.UserUniforms).strokeThickness;
l9_2728=l9_2729;
float l9_2730=0.0;
l9_2730=l9_2728;
float l9_2731=0.0;
float l9_2732=l9_2730;
float l9_2733=(*sc_set0.UserUniforms).Port_RangeMinA_N300;
float l9_2734=(*sc_set0.UserUniforms).Port_RangeMaxA_N300;
float l9_2735=(*sc_set0.UserUniforms).Port_RangeMinB_N300;
float l9_2736=(*sc_set0.UserUniforms).Port_RangeMaxB_N300;
float l9_2737=(((l9_2732-l9_2733)/((l9_2734-l9_2733)+1e-06))*(l9_2736-l9_2735))+l9_2735;
float l9_2738;
if (l9_2736>l9_2735)
{
l9_2738=fast::clamp(l9_2737,l9_2735,l9_2736);
}
else
{
l9_2738=fast::clamp(l9_2737,l9_2736,l9_2735);
}
l9_2737=l9_2738;
l9_2731=l9_2737;
l9_2722=l9_2731;
l9_2724=l9_2722;
}
else
{
l9_2724=l9_2723;
}
}
l9_2720=l9_2724;
l9_2714=l9_2720;
l9_2719=l9_2714;
}
else
{
l9_2719=l9_2715;
}
}
l9_2711=l9_2719;
float l9_2739=0.0;
float l9_2740=l9_2682;
float l9_2741=(*sc_set0.UserUniforms).Port_RangeMinA_N277;
float l9_2742=(*sc_set0.UserUniforms).Port_RangeMaxA_N277;
float l9_2743=l9_2683;
float l9_2744=l9_2711;
float l9_2745=(((l9_2740-l9_2741)/((l9_2742-l9_2741)+1e-06))*(l9_2744-l9_2743))+l9_2743;
float l9_2746;
if (l9_2744>l9_2743)
{
l9_2746=fast::clamp(l9_2745,l9_2743,l9_2744);
}
else
{
l9_2746=fast::clamp(l9_2745,l9_2744,l9_2743);
}
l9_2745=l9_2746;
l9_2739=l9_2745;
float l9_2747=0.0;
float l9_2748=(*sc_set0.UserUniforms).yOffset;
l9_2747=l9_2748;
float l9_2749=0.0;
l9_2749=l9_2747;
float l9_2750=0.0;
float l9_2751=0.0;
float l9_2752=(*sc_set0.UserUniforms).Port_Value0_N293;
float l9_2753=(*sc_set0.UserUniforms).Port_Value1_N293;
float l9_2754=(*sc_set0.UserUniforms).Port_Default_N293;
float l9_2755=0.0;
float l9_2756=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_2755=l9_2756;
float l9_2757=0.0;
l9_2757=l9_2755;
l9_2751=l9_2757;
l9_2751=floor(l9_2751);
float l9_2758;
if (l9_2751==0.0)
{
l9_2758=l9_2752;
}
else
{
if (l9_2751==1.0)
{
l9_2758=l9_2753;
}
else
{
l9_2758=l9_2754;
}
}
l9_2750=l9_2758;
float l9_2759=0.0;
l9_2759=l9_2749+l9_2750;
float l9_2760=0.0;
float l9_2761=(*sc_set0.UserUniforms).Port_Value0_N301;
float l9_2762=0.0;
float l9_2763=(*sc_set0.UserUniforms).Port_Default_N301;
float l9_2764;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_2764=l9_2761;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2765=0.0;
float l9_2766=0.0;
float l9_2767=(*sc_set0.UserUniforms).Port_Value0_N306;
float l9_2768=0.0;
float l9_2769=(*sc_set0.UserUniforms).Port_Default_N306;
float l9_2770=0.0;
float l9_2771=float((*sc_set0.UserUniforms).yDownPin!=0);
l9_2770=l9_2771;
float l9_2772=0.0;
l9_2772=l9_2770;
l9_2766=l9_2772;
l9_2766=floor(l9_2766);
float l9_2773;
if (l9_2766==0.0)
{
l9_2773=l9_2767;
}
else
{
if (l9_2766==1.0)
{
float l9_2774=0.0;
float l9_2775=(*sc_set0.UserUniforms).strokeThickness;
l9_2774=l9_2775;
float l9_2776=0.0;
l9_2776=l9_2774;
float l9_2777=0.0;
float l9_2778=l9_2776;
float l9_2779=(*sc_set0.UserUniforms).Port_RangeMinA_N305;
float l9_2780=(*sc_set0.UserUniforms).Port_RangeMaxA_N305;
float l9_2781=(*sc_set0.UserUniforms).Port_RangeMinB_N305;
float l9_2782=(*sc_set0.UserUniforms).Port_RangeMaxB_N305;
float l9_2783=(((l9_2778-l9_2779)/((l9_2780-l9_2779)+1e-06))*(l9_2782-l9_2781))+l9_2781;
float l9_2784;
if (l9_2782>l9_2781)
{
l9_2784=fast::clamp(l9_2783,l9_2781,l9_2782);
}
else
{
l9_2784=fast::clamp(l9_2783,l9_2782,l9_2781);
}
l9_2783=l9_2784;
l9_2777=l9_2783;
l9_2768=l9_2777;
l9_2773=l9_2768;
}
else
{
l9_2773=l9_2769;
}
}
l9_2765=l9_2773;
l9_2762=l9_2765;
l9_2764=l9_2762;
}
else
{
l9_2764=l9_2763;
}
}
l9_2760=l9_2764;
float l9_2785=0.0;
l9_2785=l9_2759+l9_2760;
float l9_2786=0.0;
l9_2786=l9_2739+l9_2785;
float2 l9_2787=float2(0.0);
l9_2787.x=l9_2679;
l9_2787.y=l9_2786;
float2 l9_2788=float2(0.0);
l9_2788=l9_2787;
float2 l9_2789=float2(0.0);
l9_2789=l9_2571+l9_2788;
float l9_2790=0.0;
float l9_2791=(*sc_set0.UserUniforms).Port_Value0_N132;
float l9_2792=0.0;
float l9_2793=(*sc_set0.UserUniforms).Port_Default_N132;
float l9_2794;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_2794=l9_2791;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_2795=0.0;
float l9_2796=(*sc_set0.UserUniforms).shadowRotation;
l9_2795=l9_2796;
float l9_2797=0.0;
l9_2797=l9_2795+(*sc_set0.UserUniforms).Port_Input1_N141;
l9_2792=l9_2797;
l9_2794=l9_2792;
}
else
{
l9_2794=l9_2793;
}
}
l9_2790=l9_2794;
float2 l9_2798=float2(0.0);
float2 l9_2799=l9_2789;
float l9_2800=l9_2790;
float2 l9_2801=(*sc_set0.UserUniforms).Port_Center_N092;
float l9_2802=sin(radians(l9_2800));
float l9_2803=cos(radians(l9_2800));
float2 l9_2804=l9_2799-l9_2801;
l9_2804=float2(dot(float2(l9_2803,l9_2802),l9_2804),dot(float2(-l9_2802,l9_2803),l9_2804))+l9_2801;
l9_2798=l9_2804;
float l9_2805=0.0;
float l9_2806=(*sc_set0.UserUniforms).Port_Value0_N131;
float l9_2807=0.0;
float l9_2808=(*sc_set0.UserUniforms).Port_Default_N131;
float l9_2809;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_2809=l9_2806;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_2810=0.0;
float l9_2811=(*sc_set0.UserUniforms).shadowDistance;
l9_2810=l9_2811;
l9_2807=l9_2810;
l9_2809=l9_2807;
}
else
{
l9_2809=l9_2808;
}
}
l9_2805=l9_2809;
float l9_2812=0.0;
l9_2812=l9_2805/(*sc_set0.UserUniforms).Port_Input1_N160;
float2 l9_2813=float2(0.0);
l9_2813.x=(*sc_set0.UserUniforms).Port_Value1_N097;
l9_2813.y=l9_2812;
float2 l9_2814=float2(0.0);
l9_2814=l9_2798+l9_2813;
float l9_2815=0.0;
l9_2815=l9_2790+(*sc_set0.UserUniforms).Port_Input1_N263;
float l9_2816=0.0;
l9_2816=1.0-l9_2815;
float2 l9_2817=float2(0.0);
float2 l9_2818=l9_2814;
float l9_2819=l9_2816;
float2 l9_2820=(*sc_set0.UserUniforms).Port_Center_N094;
float l9_2821=sin(radians(l9_2819));
float l9_2822=cos(radians(l9_2819));
float2 l9_2823=l9_2818-l9_2820;
l9_2823=float2(dot(float2(l9_2822,l9_2821),l9_2823),dot(float2(-l9_2821,l9_2822),l9_2823))+l9_2820;
l9_2817=l9_2823;
float l9_2824=0.0;
float l9_2825=(*sc_set0.UserUniforms).shapeRotation;
l9_2824=l9_2825;
float2 l9_2826=float2(0.0);
float2 l9_2827=l9_2817;
float l9_2828=l9_2824;
float2 l9_2829=(*sc_set0.UserUniforms).Port_Center_N100;
float l9_2830=sin(radians(l9_2828));
float l9_2831=cos(radians(l9_2828));
float2 l9_2832=l9_2827-l9_2829;
l9_2832=float2(dot(float2(l9_2831,l9_2830),l9_2832),dot(float2(-l9_2830,l9_2831),l9_2832))+l9_2829;
l9_2826=l9_2832;
float l9_2833=0.0;
float l9_2834=(*sc_set0.UserUniforms).Port_Value0_N125;
float l9_2835=0.0;
float l9_2836=(*sc_set0.UserUniforms).Port_Default_N125;
float l9_2837;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_2837=l9_2834;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_2838=0.0;
float l9_2839=(*sc_set0.UserUniforms).shadowBlur;
l9_2838=l9_2839;
l9_2835=l9_2838;
l9_2837=l9_2835;
}
else
{
l9_2837=l9_2836;
}
}
l9_2833=l9_2837;
float l9_2840=0.0;
float l9_2841=l9_2833;
float l9_2842=(*sc_set0.UserUniforms).Port_RangeMinA_N138;
float l9_2843=(*sc_set0.UserUniforms).Port_RangeMaxA_N138;
float l9_2844=(*sc_set0.UserUniforms).Port_RangeMinB_N138;
float l9_2845=(*sc_set0.UserUniforms).Port_RangeMaxB_N138;
float l9_2846=(((l9_2841-l9_2842)/((l9_2843-l9_2842)+1e-06))*(l9_2845-l9_2844))+l9_2844;
float l9_2847;
if (l9_2845>l9_2844)
{
l9_2847=fast::clamp(l9_2846,l9_2844,l9_2845);
}
else
{
l9_2847=fast::clamp(l9_2846,l9_2845,l9_2844);
}
l9_2846=l9_2847;
l9_2840=l9_2846;
float2 l9_2848=float2(0.0);
l9_2848=((l9_2826-(*sc_set0.UserUniforms).Port_Center_N137)*float2(l9_2840))+(*sc_set0.UserUniforms).Port_Center_N137;
float2 l9_2849=float2(0.0);
l9_2849=l9_2848*float2((*sc_set0.UserUniforms).Port_Input1_N019);
float2 l9_2850=float2(0.0);
l9_2850=l9_2849+float2((*sc_set0.UserUniforms).Port_Input1_N020);
float2 l9_2851=float2(0.0);
l9_2851=abs(l9_2850);
float l9_2852=0.0;
float l9_2853=(*sc_set0.UserUniforms).Port_Value0_N122;
float l9_2854=0.0;
float l9_2855=(*sc_set0.UserUniforms).Port_Default_N122;
float l9_2856;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_2856=l9_2853;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2857=0.0;
float l9_2858=(*sc_set0.UserUniforms).strokeThickness;
l9_2857=l9_2858;
l9_2854=l9_2857;
l9_2856=l9_2854;
}
else
{
l9_2856=l9_2855;
}
}
l9_2852=l9_2856;
float l9_2859=0.0;
l9_2859=l9_2852/(*sc_set0.UserUniforms).Port_Input1_N056;
float l9_2860=0.0;
l9_2860=1.0-l9_2859;
float l9_2861=0.0;
float l9_2862=l9_2572;
float l9_2863=(*sc_set0.UserUniforms).Port_RangeMinA_N021;
float l9_2864=(*sc_set0.UserUniforms).Port_RangeMaxA_N021;
float l9_2865=(*sc_set0.UserUniforms).Port_RangeMinB_N021;
float l9_2866=l9_2860;
float l9_2867=(((l9_2862-l9_2863)/((l9_2864-l9_2863)+1e-06))*(l9_2866-l9_2865))+l9_2865;
float l9_2868;
if (l9_2866>l9_2865)
{
l9_2868=fast::clamp(l9_2867,l9_2865,l9_2866);
}
else
{
l9_2868=fast::clamp(l9_2867,l9_2866,l9_2865);
}
l9_2867=l9_2868;
l9_2861=l9_2867;
float l9_2869=0.0;
l9_2869=1.0-l9_2859;
float l9_2870=0.0;
float l9_2871=l9_2680;
float l9_2872=(*sc_set0.UserUniforms).Port_RangeMinA_N022;
float l9_2873=(*sc_set0.UserUniforms).Port_RangeMaxA_N022;
float l9_2874=(*sc_set0.UserUniforms).Port_RangeMinB_N022;
float l9_2875=l9_2869;
float l9_2876=(((l9_2871-l9_2872)/((l9_2873-l9_2872)+1e-06))*(l9_2875-l9_2874))+l9_2874;
float l9_2877;
if (l9_2875>l9_2874)
{
l9_2877=fast::clamp(l9_2876,l9_2874,l9_2875);
}
else
{
l9_2877=fast::clamp(l9_2876,l9_2875,l9_2874);
}
l9_2876=l9_2877;
l9_2870=l9_2876;
float2 l9_2878=float2(0.0);
l9_2878.x=l9_2861;
l9_2878.y=l9_2870;
float2 l9_2879=float2(0.0);
l9_2879=l9_2851-l9_2878;
float l9_2880=0.0;
float l9_2881=(*sc_set0.UserUniforms).shapeRoundness;
l9_2880=l9_2881;
float l9_2882=0.0;
l9_2882=abs(l9_2880);
float l9_2883=0.0;
l9_2883=fast::min(l9_2882,l9_2861);
float l9_2884=0.0;
l9_2884=fast::min(l9_2883,l9_2870);
float l9_2885=0.0;
l9_2885=fast::max(l9_2884,(*sc_set0.UserUniforms).Port_Input1_N030);
float2 l9_2886=float2(0.0);
l9_2886=l9_2879+float2(l9_2885);
float2 l9_2887=float2(0.0);
l9_2887=fast::max(l9_2886,(*sc_set0.UserUniforms).Port_Input1_N032);
float l9_2888=0.0;
l9_2888=length(l9_2887);
float l9_2889=0.0;
l9_2889=l9_2888/l9_2885;
float l9_2890=0.0;
l9_2890=1.0-l9_2889;
float l9_2891=0.0;
float l9_2892=l9_2890;
float l9_2893=fwidth(l9_2892);
l9_2891=l9_2893;
float l9_2894=0.0;
l9_2894=l9_2833*(*sc_set0.UserUniforms).Port_Input1_N127;
float l9_2895=0.0;
l9_2895=(((l9_2891-(*sc_set0.UserUniforms).Port_RangeMinA_N135)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N135-(*sc_set0.UserUniforms).Port_RangeMinA_N135)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N135-l9_2894))+l9_2894;
float l9_2896=0.0;
l9_2896=l9_2890/l9_2895;
float l9_2897=0.0;
l9_2897=fast::clamp(l9_2896+0.001,(*sc_set0.UserUniforms).Port_Input1_N038+0.001,(*sc_set0.UserUniforms).Port_Input2_N038+0.001)-0.001;
float l9_2898=0.0;
l9_2898=l9_2560*l9_2897;
float l9_2899=0.0;
l9_2899=1.0-l9_2896;
float l9_2900=0.0;
l9_2900=fast::clamp(l9_2899+0.001,(*sc_set0.UserUniforms).Port_Input1_N264+0.001,(*sc_set0.UserUniforms).Port_Input2_N264+0.001)-0.001;
float l9_2901=0.0;
float l9_2902=l9_2572;
float l9_2903=(*sc_set0.UserUniforms).Port_RangeMinA_N039;
float l9_2904=(*sc_set0.UserUniforms).Port_RangeMaxA_N039;
float l9_2905=l9_2859;
float l9_2906=(*sc_set0.UserUniforms).Port_RangeMaxB_N039;
float l9_2907=(((l9_2902-l9_2903)/((l9_2904-l9_2903)+1e-06))*(l9_2906-l9_2905))+l9_2905;
float l9_2908;
if (l9_2906>l9_2905)
{
l9_2908=fast::clamp(l9_2907,l9_2905,l9_2906);
}
else
{
l9_2908=fast::clamp(l9_2907,l9_2906,l9_2905);
}
l9_2907=l9_2908;
l9_2901=l9_2907;
float l9_2909=0.0;
float l9_2910=l9_2680;
float l9_2911=(*sc_set0.UserUniforms).Port_RangeMinA_N042;
float l9_2912=(*sc_set0.UserUniforms).Port_RangeMaxA_N042;
float l9_2913=l9_2859;
float l9_2914=(*sc_set0.UserUniforms).Port_RangeMaxB_N042;
float l9_2915=(((l9_2910-l9_2911)/((l9_2912-l9_2911)+1e-06))*(l9_2914-l9_2913))+l9_2913;
float l9_2916;
if (l9_2914>l9_2913)
{
l9_2916=fast::clamp(l9_2915,l9_2913,l9_2914);
}
else
{
l9_2916=fast::clamp(l9_2915,l9_2914,l9_2913);
}
l9_2915=l9_2916;
l9_2909=l9_2915;
float2 l9_2917=float2(0.0);
l9_2917.x=l9_2901;
l9_2917.y=l9_2909;
float2 l9_2918=float2(0.0);
l9_2918=l9_2851-l9_2917;
float l9_2919=0.0;
float l9_2920=l9_2880;
float l9_2921=(*sc_set0.UserUniforms).Port_RangeMinA_N057;
float l9_2922=(*sc_set0.UserUniforms).Port_RangeMaxA_N057;
float l9_2923=(*sc_set0.UserUniforms).Port_RangeMinB_N057;
float l9_2924=(*sc_set0.UserUniforms).Port_RangeMaxB_N057;
float l9_2925=(((l9_2920-l9_2921)/((l9_2922-l9_2921)+1e-06))*(l9_2924-l9_2923))+l9_2923;
float l9_2926;
if (l9_2924>l9_2923)
{
l9_2926=fast::clamp(l9_2925,l9_2923,l9_2924);
}
else
{
l9_2926=fast::clamp(l9_2925,l9_2924,l9_2923);
}
l9_2925=l9_2926;
l9_2919=l9_2925;
float l9_2927=0.0;
l9_2927=(((l9_2852-(*sc_set0.UserUniforms).Port_RangeMinA_N101)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N101-(*sc_set0.UserUniforms).Port_RangeMinA_N101)+1e-06))*(l9_2919-(*sc_set0.UserUniforms).Port_RangeMinB_N101))+(*sc_set0.UserUniforms).Port_RangeMinB_N101;
float l9_2928=0.0;
float l9_2929=l9_2880;
float l9_2930=(*sc_set0.UserUniforms).Port_RangeMinA_N047;
float l9_2931=(*sc_set0.UserUniforms).Port_RangeMaxA_N047;
float l9_2932=l9_2927;
float l9_2933=(*sc_set0.UserUniforms).Port_RangeMaxB_N047;
float l9_2934=(((l9_2929-l9_2930)/((l9_2931-l9_2930)+1e-06))*(l9_2933-l9_2932))+l9_2932;
float l9_2935;
if (l9_2933>l9_2932)
{
l9_2935=fast::clamp(l9_2934,l9_2932,l9_2933);
}
else
{
l9_2935=fast::clamp(l9_2934,l9_2933,l9_2932);
}
l9_2934=l9_2935;
l9_2928=l9_2934;
float l9_2936=0.0;
l9_2936=abs(l9_2928);
float l9_2937=0.0;
l9_2937=fast::min(l9_2936,l9_2901);
float l9_2938=0.0;
l9_2938=fast::min(l9_2937,l9_2909);
float l9_2939=0.0;
l9_2939=fast::max(l9_2938,(*sc_set0.UserUniforms).Port_Input1_N051);
float2 l9_2940=float2(0.0);
l9_2940=l9_2918+float2(l9_2939);
float2 l9_2941=float2(0.0);
l9_2941=fast::max(l9_2940,(*sc_set0.UserUniforms).Port_Input1_N053);
float l9_2942=0.0;
l9_2942=length(l9_2941);
float l9_2943=0.0;
l9_2943=l9_2942/l9_2939;
float l9_2944=0.0;
l9_2944=1.0-l9_2943;
float l9_2945=0.0;
float l9_2946=l9_2944;
float l9_2947=fwidth(l9_2946);
l9_2945=l9_2947;
float l9_2948=0.0;
l9_2948=(((l9_2945-(*sc_set0.UserUniforms).Port_RangeMinA_N133)/(((*sc_set0.UserUniforms).Port_RangeMaxA_N133-(*sc_set0.UserUniforms).Port_RangeMinA_N133)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N133-l9_2833))+l9_2833;
float l9_2949=0.0;
l9_2949=l9_2944/l9_2948;
float l9_2950=0.0;
l9_2950=fast::clamp(l9_2949+0.001,(*sc_set0.UserUniforms).Port_Input1_N064+0.001,(*sc_set0.UserUniforms).Port_Input2_N064+0.001)-0.001;
float l9_2951=0.0;
l9_2951=l9_2900*l9_2950;
float l9_2952=0.0;
l9_2952=fast::clamp(l9_2951+0.001,(*sc_set0.UserUniforms).Port_Input1_N066+0.001,(*sc_set0.UserUniforms).Port_Input2_N066+0.001)-0.001;
float l9_2953=0.0;
float l9_2954=(*sc_set0.UserUniforms).Port_Value0_N068;
float l9_2955=0.0;
float l9_2956=(*sc_set0.UserUniforms).Port_Default_N068;
float l9_2957;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_2957=l9_2954;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float l9_2958=0.0;
float l9_2959=(*sc_set0.UserUniforms).strokeAlpha;
l9_2958=l9_2959;
l9_2955=l9_2958;
l9_2957=l9_2955;
}
else
{
l9_2957=l9_2956;
}
}
l9_2953=l9_2957;
float l9_2960=0.0;
l9_2960=l9_2952*l9_2953;
float l9_2961=0.0;
l9_2961=l9_2898+l9_2960;
float l9_2962=0.0;
l9_2962=fast::clamp(l9_2961+0.001,(*sc_set0.UserUniforms).Port_Input1_N072+0.001,(*sc_set0.UserUniforms).Port_Input2_N072+0.001)-0.001;
float l9_2963=0.0;
float l9_2964=(*sc_set0.UserUniforms).Port_Value0_N123;
float l9_2965=0.0;
float l9_2966=(*sc_set0.UserUniforms).Port_Default_N123;
float l9_2967;
if (int((int(Tweak_N124_tmp)!=0))==0)
{
l9_2967=l9_2964;
}
else
{
if (int((int(Tweak_N124_tmp)!=0))==1)
{
float l9_2968=0.0;
float l9_2969=(*sc_set0.UserUniforms).shadowAlpha;
l9_2968=l9_2969;
l9_2965=l9_2968;
l9_2967=l9_2965;
}
else
{
l9_2967=l9_2966;
}
}
l9_2963=l9_2967;
float l9_2970=0.0;
l9_2970=l9_2962*l9_2963;
float4 l9_2971=float4(0.0);
l9_2971=float4(l9_2550.xyz.x,l9_2550.xyz.y,l9_2550.xyz.z,l9_2971.w);
l9_2971.w=l9_2970;
float l9_2972=0.0;
l9_2972=l9_2971.w;
float l9_2973=0.0;
float l9_2974;
if ((int(Tweak_N124_tmp)!=0))
{
l9_2974=1.001;
}
else
{
l9_2974=0.001;
}
l9_2974-=0.001;
l9_2973=l9_2974;
float l9_2975=0.0;
l9_2975=l9_2972*l9_2973;
float4 l9_2976=float4(0.0);
l9_2976=float4(l9_2971.xyz.x,l9_2971.xyz.y,l9_2971.xyz.z,l9_2976.w);
l9_2976.w=l9_2975;
float l9_2977=0.0;
float l9_2978;
if ((int(innerCutout_tmp)!=0))
{
l9_2978=1.001;
}
else
{
l9_2978=0.001;
}
l9_2978-=0.001;
l9_2977=l9_2978;
float2 l9_2979=float2(0.0);
float2 l9_2980=l9_2789;
float l9_2981=l9_2824;
float2 l9_2982=(*sc_set0.UserUniforms).Port_Center_N113;
float l9_2983=sin(radians(l9_2981));
float l9_2984=cos(radians(l9_2981));
float2 l9_2985=l9_2980-l9_2982;
l9_2985=float2(dot(float2(l9_2984,l9_2983),l9_2985),dot(float2(-l9_2983,l9_2984),l9_2985))+l9_2982;
l9_2979=l9_2985;
float2 l9_2986=float2(0.0);
l9_2986=l9_2979*float2((*sc_set0.UserUniforms).Port_Input1_N089);
float2 l9_2987=float2(0.0);
l9_2987=l9_2986+float2((*sc_set0.UserUniforms).Port_Input1_N090);
float2 l9_2988=float2(0.0);
l9_2988=abs(l9_2987);
float2 l9_2989=float2(0.0);
l9_2989.x=l9_2861;
l9_2989.y=l9_2870;
float2 l9_2990=float2(0.0);
l9_2990=l9_2988-l9_2989;
float l9_2991=0.0;
l9_2991=abs(l9_2880);
float l9_2992=0.0;
l9_2992=fast::min(l9_2991,l9_2861);
float l9_2993=0.0;
l9_2993=fast::min(l9_2992,l9_2870);
float l9_2994=0.0;
l9_2994=fast::max(l9_2993,(*sc_set0.UserUniforms).Port_Input1_N103);
float2 l9_2995=float2(0.0);
l9_2995=l9_2990+float2(l9_2994);
float2 l9_2996=float2(0.0);
l9_2996=fast::max(l9_2995,(*sc_set0.UserUniforms).Port_Input1_N105);
float l9_2997=0.0;
l9_2997=length(l9_2996);
float l9_2998=0.0;
l9_2998=l9_2997/l9_2994;
float l9_2999=0.0;
l9_2999=1.0-l9_2998;
float l9_3000=0.0;
float l9_3001=l9_2999;
float l9_3002=fwidth(l9_3001);
l9_3000=l9_3002;
float l9_3003=0.0;
l9_3003=l9_2999/l9_3000;
float l9_3004=0.0;
l9_3004=fast::clamp(l9_3003+0.001,(*sc_set0.UserUniforms).Port_Input1_N112+0.001,(*sc_set0.UserUniforms).Port_Input2_N112+0.001)-0.001;
float l9_3005=0.0;
l9_3005=l9_2977*l9_3004;
float4 l9_3006=float4(0.0);
l9_3006=mix(l9_2976,float4((*sc_set0.UserUniforms).Port_Input1_N259),float4(l9_3005));
float4 l9_3007=float4(0.0);
float4 l9_3008=float4(0.0);
float4 l9_3009=float4(0.0);
float4 l9_3010=float4(0.0);
float4 l9_3011=(*sc_set0.UserUniforms).Port_Default_N149;
ssGlobals l9_3012=l9_1707;
float4 l9_3013;
if (NODE_161_DROPLIST_ITEM_tmp==0)
{
float4 l9_3014=float4(0.0);
float4 l9_3015=(*sc_set0.UserUniforms).shapeColor;
l9_3014=l9_3015;
float4 l9_3016=float4(0.0);
l9_3016=float4(l9_3014.x,l9_3014.y,l9_3014.z,1.0);
l9_3008=l9_3016;
l9_3013=l9_3008;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==1)
{
float2 l9_3017=float2(0.0);
l9_3017=l9_3012.Surface_UVCoord0;
float2 l9_3018=float2(0.0);
float2 l9_3019=(*sc_set0.UserUniforms).shapeScale;
l9_3018=l9_3019;
float2 l9_3020=float2(0.0);
float2 l9_3021=(*sc_set0.UserUniforms).shapeOffset;
l9_3020=l9_3021;
float2 l9_3022=float2(0.0);
l9_3022=(l9_3017*l9_3018)+l9_3020;
float4 l9_3023=float4(0.0);
int l9_3024;
if ((int(shapeTextureHasSwappedViews_tmp)!=0))
{
int l9_3025=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3025=0;
}
else
{
l9_3025=in.varStereoViewID;
}
int l9_3026=l9_3025;
l9_3024=1-l9_3026;
}
else
{
int l9_3027=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3027=0;
}
else
{
l9_3027=in.varStereoViewID;
}
int l9_3028=l9_3027;
l9_3024=l9_3028;
}
int l9_3029=l9_3024;
int l9_3030=shapeTextureLayout_tmp;
int l9_3031=l9_3029;
float2 l9_3032=l9_3022;
bool l9_3033=(int(SC_USE_UV_TRANSFORM_shapeTexture_tmp)!=0);
float3x3 l9_3034=(*sc_set0.UserUniforms).shapeTextureTransform;
int2 l9_3035=int2(SC_SOFTWARE_WRAP_MODE_U_shapeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_shapeTexture_tmp);
bool l9_3036=(int(SC_USE_UV_MIN_MAX_shapeTexture_tmp)!=0);
float4 l9_3037=(*sc_set0.UserUniforms).shapeTextureUvMinMax;
bool l9_3038=(int(SC_USE_CLAMP_TO_BORDER_shapeTexture_tmp)!=0);
float4 l9_3039=(*sc_set0.UserUniforms).shapeTextureBorderColor;
float l9_3040=0.0;
bool l9_3041=l9_3038&&(!l9_3036);
float l9_3042=1.0;
float l9_3043=l9_3032.x;
int l9_3044=l9_3035.x;
if (l9_3044==1)
{
l9_3043=fract(l9_3043);
}
else
{
if (l9_3044==2)
{
float l9_3045=fract(l9_3043);
float l9_3046=l9_3043-l9_3045;
float l9_3047=step(0.25,fract(l9_3046*0.5));
l9_3043=mix(l9_3045,1.0-l9_3045,fast::clamp(l9_3047,0.0,1.0));
}
}
l9_3032.x=l9_3043;
float l9_3048=l9_3032.y;
int l9_3049=l9_3035.y;
if (l9_3049==1)
{
l9_3048=fract(l9_3048);
}
else
{
if (l9_3049==2)
{
float l9_3050=fract(l9_3048);
float l9_3051=l9_3048-l9_3050;
float l9_3052=step(0.25,fract(l9_3051*0.5));
l9_3048=mix(l9_3050,1.0-l9_3050,fast::clamp(l9_3052,0.0,1.0));
}
}
l9_3032.y=l9_3048;
if (l9_3036)
{
bool l9_3053=l9_3038;
bool l9_3054;
if (l9_3053)
{
l9_3054=l9_3035.x==3;
}
else
{
l9_3054=l9_3053;
}
float l9_3055=l9_3032.x;
float l9_3056=l9_3037.x;
float l9_3057=l9_3037.z;
bool l9_3058=l9_3054;
float l9_3059=l9_3042;
float l9_3060=fast::clamp(l9_3055,l9_3056,l9_3057);
float l9_3061=step(abs(l9_3055-l9_3060),9.9999997e-06);
l9_3059*=(l9_3061+((1.0-float(l9_3058))*(1.0-l9_3061)));
l9_3055=l9_3060;
l9_3032.x=l9_3055;
l9_3042=l9_3059;
bool l9_3062=l9_3038;
bool l9_3063;
if (l9_3062)
{
l9_3063=l9_3035.y==3;
}
else
{
l9_3063=l9_3062;
}
float l9_3064=l9_3032.y;
float l9_3065=l9_3037.y;
float l9_3066=l9_3037.w;
bool l9_3067=l9_3063;
float l9_3068=l9_3042;
float l9_3069=fast::clamp(l9_3064,l9_3065,l9_3066);
float l9_3070=step(abs(l9_3064-l9_3069),9.9999997e-06);
l9_3068*=(l9_3070+((1.0-float(l9_3067))*(1.0-l9_3070)));
l9_3064=l9_3069;
l9_3032.y=l9_3064;
l9_3042=l9_3068;
}
float2 l9_3071=l9_3032;
bool l9_3072=l9_3033;
float3x3 l9_3073=l9_3034;
if (l9_3072)
{
l9_3071=float2((l9_3073*float3(l9_3071,1.0)).xy);
}
float2 l9_3074=l9_3071;
l9_3032=l9_3074;
float l9_3075=l9_3032.x;
int l9_3076=l9_3035.x;
bool l9_3077=l9_3041;
float l9_3078=l9_3042;
if ((l9_3076==0)||(l9_3076==3))
{
float l9_3079=l9_3075;
float l9_3080=0.0;
float l9_3081=1.0;
bool l9_3082=l9_3077;
float l9_3083=l9_3078;
float l9_3084=fast::clamp(l9_3079,l9_3080,l9_3081);
float l9_3085=step(abs(l9_3079-l9_3084),9.9999997e-06);
l9_3083*=(l9_3085+((1.0-float(l9_3082))*(1.0-l9_3085)));
l9_3079=l9_3084;
l9_3075=l9_3079;
l9_3078=l9_3083;
}
l9_3032.x=l9_3075;
l9_3042=l9_3078;
float l9_3086=l9_3032.y;
int l9_3087=l9_3035.y;
bool l9_3088=l9_3041;
float l9_3089=l9_3042;
if ((l9_3087==0)||(l9_3087==3))
{
float l9_3090=l9_3086;
float l9_3091=0.0;
float l9_3092=1.0;
bool l9_3093=l9_3088;
float l9_3094=l9_3089;
float l9_3095=fast::clamp(l9_3090,l9_3091,l9_3092);
float l9_3096=step(abs(l9_3090-l9_3095),9.9999997e-06);
l9_3094*=(l9_3096+((1.0-float(l9_3093))*(1.0-l9_3096)));
l9_3090=l9_3095;
l9_3086=l9_3090;
l9_3089=l9_3094;
}
l9_3032.y=l9_3086;
l9_3042=l9_3089;
float2 l9_3097=l9_3032;
int l9_3098=l9_3030;
int l9_3099=l9_3031;
float l9_3100=l9_3040;
float2 l9_3101=l9_3097;
int l9_3102=l9_3098;
int l9_3103=l9_3099;
float3 l9_3104=float3(0.0);
if (l9_3102==0)
{
l9_3104=float3(l9_3101,0.0);
}
else
{
if (l9_3102==1)
{
l9_3104=float3(l9_3101.x,(l9_3101.y*0.5)+(0.5-(float(l9_3103)*0.5)),0.0);
}
else
{
l9_3104=float3(l9_3101,float(l9_3103));
}
}
float3 l9_3105=l9_3104;
float3 l9_3106=l9_3105;
float4 l9_3107=sc_set0.shapeTexture.sample(sc_set0.shapeTextureSmpSC,l9_3106.xy,bias(l9_3100));
float4 l9_3108=l9_3107;
if (l9_3038)
{
l9_3108=mix(l9_3039,l9_3108,float4(l9_3042));
}
float4 l9_3109=l9_3108;
l9_3023=l9_3109;
float4 l9_3110=float4(0.0);
float4 l9_3111=(*sc_set0.UserUniforms).shapeColor;
l9_3110=l9_3111;
float4 l9_3112=float4(0.0);
l9_3112=l9_3023*l9_3110;
l9_3009=l9_3112;
l9_3013=l9_3009;
}
else
{
if (NODE_161_DROPLIST_ITEM_tmp==2)
{
float4 l9_3113=float4(0.0);
float4 l9_3114=float4(0.0);
float4 l9_3115=float4(0.0);
float4 l9_3116=(*sc_set0.UserUniforms).Port_Default_N209;
ssGlobals l9_3117=l9_3012;
float4 l9_3118;
if (int((int(toQuadShapeGrad_tmp)!=0))==0)
{
float4 l9_3119=float4(0.0);
float4 l9_3120=(*sc_set0.UserUniforms).shapeGradColorA;
l9_3119=l9_3120;
float4 l9_3121=float4(0.0);
l9_3121=l9_3119;
float4 l9_3122=float4(0.0);
float4 l9_3123=(*sc_set0.UserUniforms).shapeGradColorB;
l9_3122=l9_3123;
float4 l9_3124=float4(0.0);
l9_3124=l9_3122;
float2 l9_3125=float2(0.0);
l9_3125=l9_3117.Surface_UVCoord0;
float2 l9_3126=float2(0.0);
l9_3126=(((l9_3125-float2((*sc_set0.UserUniforms).Port_RangeMinA_N175))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N175-(*sc_set0.UserUniforms).Port_RangeMinA_N175)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N175-(*sc_set0.UserUniforms).Port_RangeMinB_N175))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N175);
float2 l9_3127=float2(0.0);
float2 l9_3128=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_3127=l9_3128;
float2 l9_3129=float2(0.0);
l9_3129=l9_3127;
float2 l9_3130=float2(0.0);
l9_3130=((l9_3126-(*sc_set0.UserUniforms).Port_Center_N177)*l9_3129)+(*sc_set0.UserUniforms).Port_Center_N177;
float2 l9_3131=float2(0.0);
float2 l9_3132=(*sc_set0.UserUniforms).shapeGradPointA;
l9_3131=l9_3132;
float2 l9_3133=float2(0.0);
l9_3133=l9_3131;
float2 l9_3134=float2(0.0);
l9_3134=l9_3130-l9_3133;
float2 l9_3135=float2(0.0);
float2 l9_3136=(*sc_set0.UserUniforms).shapeGradPointB;
l9_3135=l9_3136;
float2 l9_3137=float2(0.0);
l9_3137=l9_3135;
float2 l9_3138=float2(0.0);
l9_3138=l9_3137-l9_3133;
float l9_3139=0.0;
l9_3139=dot(l9_3134,l9_3138);
float l9_3140=0.0;
l9_3140=dot(l9_3138,l9_3138);
float l9_3141=0.0;
l9_3141=l9_3139/l9_3140;
float l9_3142=0.0;
l9_3142=fast::clamp(l9_3141+0.001,(*sc_set0.UserUniforms).Port_Input1_N185+0.001,(*sc_set0.UserUniforms).Port_Input2_N185+0.001)-0.001;
float l9_3143=0.0;
l9_3143=smoothstep((*sc_set0.UserUniforms).Port_Input0_N186,(*sc_set0.UserUniforms).Port_Input1_N186,l9_3142);
float4 l9_3144=float4(0.0);
l9_3144=mix(l9_3121,l9_3124,float4(l9_3143));
float4 l9_3145=float4(0.0);
l9_3145=l9_3144;
l9_3114=l9_3145;
l9_3118=l9_3114;
}
else
{
if (int((int(toQuadShapeGrad_tmp)!=0))==1)
{
float4 l9_3146=float4(0.0);
float4 l9_3147=(*sc_set0.UserUniforms).shapeGradColorA;
l9_3146=l9_3147;
float4 l9_3148=float4(0.0);
l9_3148=l9_3146;
float4 l9_3149=float4(0.0);
float4 l9_3150=(*sc_set0.UserUniforms).shapeGradColorB;
l9_3149=l9_3150;
float4 l9_3151=float4(0.0);
l9_3151=l9_3149;
float2 l9_3152=float2(0.0);
l9_3152=l9_3117.Surface_UVCoord0;
float2 l9_3153=float2(0.0);
l9_3153=(((l9_3152-float2((*sc_set0.UserUniforms).Port_RangeMinA_N198))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N198-(*sc_set0.UserUniforms).Port_RangeMinA_N198)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N198-(*sc_set0.UserUniforms).Port_RangeMinB_N198))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N198);
float2 l9_3154=float2(0.0);
float2 l9_3155=(*sc_set0.UserUniforms).shapeScaleGrad;
l9_3154=l9_3155;
float2 l9_3156=float2(0.0);
l9_3156=l9_3154;
float2 l9_3157=float2(0.0);
float2 l9_3158=(*sc_set0.UserUniforms).shapeQuadOffset;
l9_3157=l9_3158;
float2 l9_3159=float2(0.0);
l9_3159=l9_3157;
float2 l9_3160=float2(0.0);
l9_3160=(l9_3153*l9_3156)+l9_3159;
float l9_3161=0.0;
float l9_3162=0.0;
float2 l9_3163=l9_3160;
float l9_3164=l9_3163.x;
float l9_3165=l9_3163.y;
l9_3161=l9_3164;
l9_3162=l9_3165;
float4 l9_3166=float4(0.0);
l9_3166=mix(l9_3148,l9_3151,float4(l9_3161));
float4 l9_3167=float4(0.0);
float4 l9_3168=(*sc_set0.UserUniforms).shapeGradColorC;
l9_3167=l9_3168;
float4 l9_3169=float4(0.0);
l9_3169=l9_3167;
float4 l9_3170=float4(0.0);
float4 l9_3171=(*sc_set0.UserUniforms).shapeGradColorD;
l9_3170=l9_3171;
float4 l9_3172=float4(0.0);
l9_3172=l9_3170;
float4 l9_3173=float4(0.0);
l9_3173=mix(l9_3169,l9_3172,float4(l9_3161));
float4 l9_3174=float4(0.0);
l9_3174=mix(l9_3166,l9_3173,float4(l9_3162));
float4 l9_3175=float4(0.0);
l9_3175=l9_3174;
l9_3115=l9_3175;
l9_3118=l9_3115;
}
else
{
l9_3118=l9_3116;
}
}
l9_3113=l9_3118;
l9_3010=l9_3113;
l9_3013=l9_3010;
}
else
{
l9_3013=l9_3011;
}
}
}
l9_3007=l9_3013;
float l9_3176=0.0;
l9_3176=fast::clamp(l9_3003+0.001,(*sc_set0.UserUniforms).Port_Input1_N265+0.001,(*sc_set0.UserUniforms).Port_Input2_N265+0.001)-0.001;
float l9_3177=0.0;
l9_3177=1.0-l9_3176;
float2 l9_3178=float2(0.0);
l9_3178.x=l9_2901;
l9_3178.y=l9_2909;
float2 l9_3179=float2(0.0);
l9_3179=l9_2988-l9_3178;
float l9_3180=0.0;
l9_3180=abs(l9_2928);
float l9_3181=0.0;
l9_3181=fast::min(l9_3180,l9_2901);
float l9_3182=0.0;
l9_3182=fast::min(l9_3181,l9_2909);
float l9_3183=0.0;
l9_3183=fast::max(l9_3182,(*sc_set0.UserUniforms).Port_Input1_N098);
float2 l9_3184=float2(0.0);
l9_3184=l9_3179+float2(l9_3183);
float2 l9_3185=float2(0.0);
l9_3185=fast::max(l9_3184,(*sc_set0.UserUniforms).Port_Input1_N115);
float l9_3186=0.0;
l9_3186=length(l9_3185);
float l9_3187=0.0;
l9_3187=l9_3186/l9_3183;
float l9_3188=0.0;
l9_3188=1.0-l9_3187;
float l9_3189=0.0;
float l9_3190=l9_3188;
float l9_3191=fwidth(l9_3190);
l9_3189=l9_3191;
float l9_3192=0.0;
l9_3192=l9_3188/l9_3189;
float l9_3193=0.0;
l9_3193=fast::clamp(l9_3192+0.001,(*sc_set0.UserUniforms).Port_Input1_N142+0.001,(*sc_set0.UserUniforms).Port_Input2_N142+0.001)-0.001;
float l9_3194=0.0;
l9_3194=l9_3177*l9_3193;
float l9_3195=0.0;
l9_3195=fast::clamp(l9_3194+0.001,(*sc_set0.UserUniforms).Port_Input1_N144+0.001,(*sc_set0.UserUniforms).Port_Input2_N144+0.001)-0.001;
float l9_3196=0.0;
l9_3196=l9_3195*l9_2953;
float l9_3197=0.0;
l9_3197=l9_3004*l9_2560;
float l9_3198=0.0;
l9_3198=l9_3196+l9_3197;
float l9_3199=0.0;
l9_3199=fast::max(l9_3196,l9_3197);
float l9_3200=0.0;
l9_3200=l9_3198-l9_3199;
float l9_3201=0.0;
l9_3201=l9_3200+l9_3197;
float l9_3202=0.0;
float l9_3203;
if ((int(shapeColorInvert_tmp)!=0))
{
l9_3203=1.001;
}
else
{
l9_3203=0.001;
}
l9_3203-=0.001;
l9_3202=l9_3203;
float l9_3204=0.0;
l9_3204=1.0-l9_3202;
float l9_3205=0.0;
float l9_3206=l9_3201;
float l9_3207=(*sc_set0.UserUniforms).Port_RangeMinA_N171;
float l9_3208=(*sc_set0.UserUniforms).Port_RangeMaxA_N171;
float l9_3209=l9_3204;
float l9_3210=l9_3202;
float l9_3211=(((l9_3206-l9_3207)/((l9_3208-l9_3207)+1e-06))*(l9_3210-l9_3209))+l9_3209;
float l9_3212;
if (l9_3210>l9_3209)
{
l9_3212=fast::clamp(l9_3211,l9_3209,l9_3210);
}
else
{
l9_3212=fast::clamp(l9_3211,l9_3210,l9_3209);
}
l9_3211=l9_3212;
l9_3205=l9_3211;
float4 l9_3213=float4(0.0);
l9_3213=mix(l9_3006,l9_3007,float4(l9_3205));
float4 l9_3214=float4(0.0);
float4 l9_3215=(*sc_set0.UserUniforms).Port_Value0_N325;
float4 l9_3216=float4(0.0);
float4 l9_3217=(*sc_set0.UserUniforms).Port_Default_N325;
ssGlobals l9_3218=l9_1707;
float4 l9_3219;
if (int((int(Tweak_N139_tmp)!=0))==0)
{
l9_3219=l9_3215;
}
else
{
if (int((int(Tweak_N139_tmp)!=0))==1)
{
float4 l9_3220=float4(0.0);
float4 l9_3221=float4(0.0);
float4 l9_3222=float4(0.0);
float4 l9_3223=float4(0.0);
float4 l9_3224=(*sc_set0.UserUniforms).Port_Default_N324;
ssGlobals l9_3225=l9_3218;
float4 l9_3226;
if (NODE_164_DROPLIST_ITEM_tmp==0)
{
float4 l9_3227=float4(0.0);
float4 l9_3228=(*sc_set0.UserUniforms).strokeColor;
l9_3227=l9_3228;
l9_3221=l9_3227;
l9_3226=l9_3221;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==1)
{
float2 l9_3229=float2(0.0);
l9_3229=l9_3225.Surface_UVCoord0;
float2 l9_3230=float2(0.0);
float2 l9_3231=(*sc_set0.UserUniforms).strokeScale;
l9_3230=l9_3231;
float2 l9_3232=float2(0.0);
float2 l9_3233=(*sc_set0.UserUniforms).strokeOffset;
l9_3232=l9_3233;
float2 l9_3234=float2(0.0);
l9_3234=(l9_3229*l9_3230)+l9_3232;
float4 l9_3235=float4(0.0);
int l9_3236;
if ((int(strokeTextureHasSwappedViews_tmp)!=0))
{
int l9_3237=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3237=0;
}
else
{
l9_3237=in.varStereoViewID;
}
int l9_3238=l9_3237;
l9_3236=1-l9_3238;
}
else
{
int l9_3239=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3239=0;
}
else
{
l9_3239=in.varStereoViewID;
}
int l9_3240=l9_3239;
l9_3236=l9_3240;
}
int l9_3241=l9_3236;
int l9_3242=strokeTextureLayout_tmp;
int l9_3243=l9_3241;
float2 l9_3244=l9_3234;
bool l9_3245=(int(SC_USE_UV_TRANSFORM_strokeTexture_tmp)!=0);
float3x3 l9_3246=(*sc_set0.UserUniforms).strokeTextureTransform;
int2 l9_3247=int2(SC_SOFTWARE_WRAP_MODE_U_strokeTexture_tmp,SC_SOFTWARE_WRAP_MODE_V_strokeTexture_tmp);
bool l9_3248=(int(SC_USE_UV_MIN_MAX_strokeTexture_tmp)!=0);
float4 l9_3249=(*sc_set0.UserUniforms).strokeTextureUvMinMax;
bool l9_3250=(int(SC_USE_CLAMP_TO_BORDER_strokeTexture_tmp)!=0);
float4 l9_3251=(*sc_set0.UserUniforms).strokeTextureBorderColor;
float l9_3252=0.0;
bool l9_3253=l9_3250&&(!l9_3248);
float l9_3254=1.0;
float l9_3255=l9_3244.x;
int l9_3256=l9_3247.x;
if (l9_3256==1)
{
l9_3255=fract(l9_3255);
}
else
{
if (l9_3256==2)
{
float l9_3257=fract(l9_3255);
float l9_3258=l9_3255-l9_3257;
float l9_3259=step(0.25,fract(l9_3258*0.5));
l9_3255=mix(l9_3257,1.0-l9_3257,fast::clamp(l9_3259,0.0,1.0));
}
}
l9_3244.x=l9_3255;
float l9_3260=l9_3244.y;
int l9_3261=l9_3247.y;
if (l9_3261==1)
{
l9_3260=fract(l9_3260);
}
else
{
if (l9_3261==2)
{
float l9_3262=fract(l9_3260);
float l9_3263=l9_3260-l9_3262;
float l9_3264=step(0.25,fract(l9_3263*0.5));
l9_3260=mix(l9_3262,1.0-l9_3262,fast::clamp(l9_3264,0.0,1.0));
}
}
l9_3244.y=l9_3260;
if (l9_3248)
{
bool l9_3265=l9_3250;
bool l9_3266;
if (l9_3265)
{
l9_3266=l9_3247.x==3;
}
else
{
l9_3266=l9_3265;
}
float l9_3267=l9_3244.x;
float l9_3268=l9_3249.x;
float l9_3269=l9_3249.z;
bool l9_3270=l9_3266;
float l9_3271=l9_3254;
float l9_3272=fast::clamp(l9_3267,l9_3268,l9_3269);
float l9_3273=step(abs(l9_3267-l9_3272),9.9999997e-06);
l9_3271*=(l9_3273+((1.0-float(l9_3270))*(1.0-l9_3273)));
l9_3267=l9_3272;
l9_3244.x=l9_3267;
l9_3254=l9_3271;
bool l9_3274=l9_3250;
bool l9_3275;
if (l9_3274)
{
l9_3275=l9_3247.y==3;
}
else
{
l9_3275=l9_3274;
}
float l9_3276=l9_3244.y;
float l9_3277=l9_3249.y;
float l9_3278=l9_3249.w;
bool l9_3279=l9_3275;
float l9_3280=l9_3254;
float l9_3281=fast::clamp(l9_3276,l9_3277,l9_3278);
float l9_3282=step(abs(l9_3276-l9_3281),9.9999997e-06);
l9_3280*=(l9_3282+((1.0-float(l9_3279))*(1.0-l9_3282)));
l9_3276=l9_3281;
l9_3244.y=l9_3276;
l9_3254=l9_3280;
}
float2 l9_3283=l9_3244;
bool l9_3284=l9_3245;
float3x3 l9_3285=l9_3246;
if (l9_3284)
{
l9_3283=float2((l9_3285*float3(l9_3283,1.0)).xy);
}
float2 l9_3286=l9_3283;
l9_3244=l9_3286;
float l9_3287=l9_3244.x;
int l9_3288=l9_3247.x;
bool l9_3289=l9_3253;
float l9_3290=l9_3254;
if ((l9_3288==0)||(l9_3288==3))
{
float l9_3291=l9_3287;
float l9_3292=0.0;
float l9_3293=1.0;
bool l9_3294=l9_3289;
float l9_3295=l9_3290;
float l9_3296=fast::clamp(l9_3291,l9_3292,l9_3293);
float l9_3297=step(abs(l9_3291-l9_3296),9.9999997e-06);
l9_3295*=(l9_3297+((1.0-float(l9_3294))*(1.0-l9_3297)));
l9_3291=l9_3296;
l9_3287=l9_3291;
l9_3290=l9_3295;
}
l9_3244.x=l9_3287;
l9_3254=l9_3290;
float l9_3298=l9_3244.y;
int l9_3299=l9_3247.y;
bool l9_3300=l9_3253;
float l9_3301=l9_3254;
if ((l9_3299==0)||(l9_3299==3))
{
float l9_3302=l9_3298;
float l9_3303=0.0;
float l9_3304=1.0;
bool l9_3305=l9_3300;
float l9_3306=l9_3301;
float l9_3307=fast::clamp(l9_3302,l9_3303,l9_3304);
float l9_3308=step(abs(l9_3302-l9_3307),9.9999997e-06);
l9_3306*=(l9_3308+((1.0-float(l9_3305))*(1.0-l9_3308)));
l9_3302=l9_3307;
l9_3298=l9_3302;
l9_3301=l9_3306;
}
l9_3244.y=l9_3298;
l9_3254=l9_3301;
float2 l9_3309=l9_3244;
int l9_3310=l9_3242;
int l9_3311=l9_3243;
float l9_3312=l9_3252;
float2 l9_3313=l9_3309;
int l9_3314=l9_3310;
int l9_3315=l9_3311;
float3 l9_3316=float3(0.0);
if (l9_3314==0)
{
l9_3316=float3(l9_3313,0.0);
}
else
{
if (l9_3314==1)
{
l9_3316=float3(l9_3313.x,(l9_3313.y*0.5)+(0.5-(float(l9_3315)*0.5)),0.0);
}
else
{
l9_3316=float3(l9_3313,float(l9_3315));
}
}
float3 l9_3317=l9_3316;
float3 l9_3318=l9_3317;
float4 l9_3319=sc_set0.strokeTexture.sample(sc_set0.strokeTextureSmpSC,l9_3318.xy,bias(l9_3312));
float4 l9_3320=l9_3319;
if (l9_3250)
{
l9_3320=mix(l9_3251,l9_3320,float4(l9_3254));
}
float4 l9_3321=l9_3320;
l9_3235=l9_3321;
float4 l9_3322=float4(0.0);
float4 l9_3323=(*sc_set0.UserUniforms).strokeColor;
l9_3322=l9_3323;
float4 l9_3324=float4(0.0);
l9_3324=l9_3235*l9_3322;
l9_3222=l9_3324;
l9_3226=l9_3222;
}
else
{
if (NODE_164_DROPLIST_ITEM_tmp==2)
{
float4 l9_3325=float4(0.0);
float4 l9_3326=float4(0.0);
float4 l9_3327=float4(0.0);
float4 l9_3328=(*sc_set0.UserUniforms).Port_Default_N323;
ssGlobals l9_3329=l9_3225;
float4 l9_3330;
if (int((int(toQuadStrokeGrad_tmp)!=0))==0)
{
float4 l9_3331=float4(0.0);
float4 l9_3332=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_3331=l9_3332;
float4 l9_3333=float4(0.0);
l9_3333=l9_3331;
float4 l9_3334=float4(0.0);
float4 l9_3335=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_3334=l9_3335;
float4 l9_3336=float4(0.0);
l9_3336=l9_3334;
float2 l9_3337=float2(0.0);
l9_3337=l9_3329.Surface_UVCoord0;
float2 l9_3338=float2(0.0);
l9_3338=(((l9_3337-float2((*sc_set0.UserUniforms).Port_RangeMinA_N231))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N231-(*sc_set0.UserUniforms).Port_RangeMinA_N231)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N231-(*sc_set0.UserUniforms).Port_RangeMinB_N231))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N231);
float2 l9_3339=float2(0.0);
float2 l9_3340=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_3339=l9_3340;
float2 l9_3341=float2(0.0);
l9_3341=l9_3339;
float2 l9_3342=float2(0.0);
l9_3342=((l9_3338-(*sc_set0.UserUniforms).Port_Center_N233)*l9_3341)+(*sc_set0.UserUniforms).Port_Center_N233;
float2 l9_3343=float2(0.0);
float2 l9_3344=(*sc_set0.UserUniforms).shapeGradPointA2;
l9_3343=l9_3344;
float2 l9_3345=float2(0.0);
l9_3345=l9_3343;
float2 l9_3346=float2(0.0);
l9_3346=l9_3342-l9_3345;
float2 l9_3347=float2(0.0);
float2 l9_3348=(*sc_set0.UserUniforms).shapeGradPointB2;
l9_3347=l9_3348;
float2 l9_3349=float2(0.0);
l9_3349=l9_3347;
float2 l9_3350=float2(0.0);
l9_3350=l9_3349-l9_3345;
float l9_3351=0.0;
l9_3351=dot(l9_3346,l9_3350);
float l9_3352=0.0;
l9_3352=dot(l9_3350,l9_3350);
float l9_3353=0.0;
l9_3353=l9_3351/l9_3352;
float l9_3354=0.0;
l9_3354=fast::clamp(l9_3353+0.001,(*sc_set0.UserUniforms).Port_Input1_N241+0.001,(*sc_set0.UserUniforms).Port_Input2_N241+0.001)-0.001;
float l9_3355=0.0;
l9_3355=smoothstep((*sc_set0.UserUniforms).Port_Input0_N242,(*sc_set0.UserUniforms).Port_Input1_N242,l9_3354);
float4 l9_3356=float4(0.0);
l9_3356=mix(l9_3333,l9_3336,float4(l9_3355));
float4 l9_3357=float4(0.0);
l9_3357=l9_3356;
l9_3326=l9_3357;
l9_3330=l9_3326;
}
else
{
if (int((int(toQuadStrokeGrad_tmp)!=0))==1)
{
float4 l9_3358=float4(0.0);
float4 l9_3359=(*sc_set0.UserUniforms).shapeGradColorA2;
l9_3358=l9_3359;
float4 l9_3360=float4(0.0);
l9_3360=l9_3358;
float4 l9_3361=float4(0.0);
float4 l9_3362=(*sc_set0.UserUniforms).shapeGradColorB2;
l9_3361=l9_3362;
float4 l9_3363=float4(0.0);
l9_3363=l9_3361;
float2 l9_3364=float2(0.0);
l9_3364=l9_3329.Surface_UVCoord0;
float2 l9_3365=float2(0.0);
l9_3365=(((l9_3364-float2((*sc_set0.UserUniforms).Port_RangeMinA_N252))/float2(((*sc_set0.UserUniforms).Port_RangeMaxA_N252-(*sc_set0.UserUniforms).Port_RangeMinA_N252)+1e-06))*((*sc_set0.UserUniforms).Port_RangeMaxB_N252-(*sc_set0.UserUniforms).Port_RangeMinB_N252))+float2((*sc_set0.UserUniforms).Port_RangeMinB_N252);
float2 l9_3366=float2(0.0);
float2 l9_3367=(*sc_set0.UserUniforms).shapeScaleGrad2;
l9_3366=l9_3367;
float2 l9_3368=float2(0.0);
l9_3368=l9_3366;
float2 l9_3369=float2(0.0);
float2 l9_3370=(*sc_set0.UserUniforms).shapeQuadOffset2;
l9_3369=l9_3370;
float2 l9_3371=float2(0.0);
l9_3371=l9_3369;
float2 l9_3372=float2(0.0);
l9_3372=(l9_3365*l9_3368)+l9_3371;
float l9_3373=0.0;
float l9_3374=0.0;
float2 l9_3375=l9_3372;
float l9_3376=l9_3375.x;
float l9_3377=l9_3375.y;
l9_3373=l9_3376;
l9_3374=l9_3377;
float4 l9_3378=float4(0.0);
l9_3378=mix(l9_3360,l9_3363,float4(l9_3373));
float4 l9_3379=float4(0.0);
float4 l9_3380=(*sc_set0.UserUniforms).shapeGradColorC2;
l9_3379=l9_3380;
float4 l9_3381=float4(0.0);
l9_3381=l9_3379;
float4 l9_3382=float4(0.0);
float4 l9_3383=(*sc_set0.UserUniforms).shapeGradColorD2;
l9_3382=l9_3383;
float4 l9_3384=float4(0.0);
l9_3384=l9_3382;
float4 l9_3385=float4(0.0);
l9_3385=mix(l9_3381,l9_3384,float4(l9_3373));
float4 l9_3386=float4(0.0);
l9_3386=mix(l9_3378,l9_3385,float4(l9_3374));
float4 l9_3387=float4(0.0);
l9_3387=l9_3386;
l9_3327=l9_3387;
l9_3330=l9_3327;
}
else
{
l9_3330=l9_3328;
}
}
l9_3325=l9_3330;
l9_3223=l9_3325;
l9_3226=l9_3223;
}
else
{
l9_3226=l9_3224;
}
}
}
l9_3220=l9_3226;
l9_3216=l9_3220;
l9_3219=l9_3216;
}
else
{
l9_3219=l9_3217;
}
}
l9_3214=l9_3219;
float4 l9_3388=float4(0.0);
l9_3388=mix(l9_3213,l9_3214,float4(l9_3196));
float l9_3389=0.0;
float l9_3390=0.0;
float l9_3391=0.0;
float l9_3392=0.0;
float4 l9_3393=l9_3388;
float l9_3394=l9_3393.x;
float l9_3395=l9_3393.y;
float l9_3396=l9_3393.z;
float l9_3397=l9_3393.w;
l9_3389=l9_3394;
l9_3390=l9_3395;
l9_3391=l9_3396;
l9_3392=l9_3397;
float l9_3398=0.0;
l9_3398=l9_3392*(*sc_set0.UserUniforms).Port_Input1_N335;
float4 l9_3399=float4(0.0);
l9_3399.x=l9_3389;
l9_3399.y=l9_3390;
l9_3399.z=l9_3391;
l9_3399.w=l9_3398;
l9_1706=l9_3399;
l9_1710=l9_1706;
}
l9_1703=l9_1710;
float4 l9_3400=float4(0.0);
l9_3400=l9_1703*(*sc_set0.UserUniforms).Port_Input1_N345;
param_3=l9_3400;
param_4=param_3;
}
Result_N343=param_4;
float4 Value_N353=float4(0.0);
Value_N353=Result_N343;
float4 Result_N5=float4(0.0);
float param_6=0.0;
float4 param_7=float4(0.0);
float4 param_8=float4(0.0);
ssGlobals param_10=Globals;
float l9_3401=0.0;
float l9_3402=float((*sc_set0.UserUniforms).Active!=0);
l9_3401=l9_3402;
float l9_3403=0.0;
float l9_3404=float((*sc_set0.UserUniforms).Hover!=0);
l9_3403=l9_3404;
float l9_3405=0.0;
float l9_3406=l9_3401;
bool l9_3407=(l9_3406*1.0)!=0.0;
bool l9_3408;
if (!l9_3407)
{
l9_3408=(l9_3403*1.0)!=0.0;
}
else
{
l9_3408=l9_3407;
}
l9_3405=float(l9_3408);
param_6=l9_3405;
float4 param_9;
if ((param_6*1.0)!=0.0)
{
float4 l9_3409=float4(0.0);
l9_3409=float4((*sc_set0.UserUniforms).Port_Input_N339.x,(*sc_set0.UserUniforms).Port_Input_N339.y,(*sc_set0.UserUniforms).Port_Input_N339.z,(*sc_set0.UserUniforms).Port_Input_N339.w);
float l9_3410=0.0;
float l9_3411=0.0;
float l9_3412=0.0;
float4 l9_3413=l9_3409;
float l9_3414=l9_3413.x;
float l9_3415=l9_3413.y;
float l9_3416=l9_3413.z;
l9_3410=l9_3414;
l9_3411=l9_3415;
l9_3412=l9_3416;
float2 l9_3417=float2(0.0);
l9_3417=param_10.Surface_UVCoord0;
float2 l9_3418=float2(0.0);
l9_3418=((l9_3417-(*sc_set0.UserUniforms).Port_Center_N340)*(*sc_set0.UserUniforms).Port_Scale_N340)+(*sc_set0.UserUniforms).Port_Center_N340;
float4 l9_3419=float4(0.0);
int l9_3420;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_3421=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3421=0;
}
else
{
l9_3421=in.varStereoViewID;
}
int l9_3422=l9_3421;
l9_3420=1-l9_3422;
}
else
{
int l9_3423=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3423=0;
}
else
{
l9_3423=in.varStereoViewID;
}
int l9_3424=l9_3423;
l9_3420=l9_3424;
}
int l9_3425=l9_3420;
int l9_3426=baseTexLayout_tmp;
int l9_3427=l9_3425;
float2 l9_3428=l9_3418;
bool l9_3429=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_3430=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_3431=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_3432=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_3433=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_3434=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_3435=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_3436=0.0;
bool l9_3437=l9_3434&&(!l9_3432);
float l9_3438=1.0;
float l9_3439=l9_3428.x;
int l9_3440=l9_3431.x;
if (l9_3440==1)
{
l9_3439=fract(l9_3439);
}
else
{
if (l9_3440==2)
{
float l9_3441=fract(l9_3439);
float l9_3442=l9_3439-l9_3441;
float l9_3443=step(0.25,fract(l9_3442*0.5));
l9_3439=mix(l9_3441,1.0-l9_3441,fast::clamp(l9_3443,0.0,1.0));
}
}
l9_3428.x=l9_3439;
float l9_3444=l9_3428.y;
int l9_3445=l9_3431.y;
if (l9_3445==1)
{
l9_3444=fract(l9_3444);
}
else
{
if (l9_3445==2)
{
float l9_3446=fract(l9_3444);
float l9_3447=l9_3444-l9_3446;
float l9_3448=step(0.25,fract(l9_3447*0.5));
l9_3444=mix(l9_3446,1.0-l9_3446,fast::clamp(l9_3448,0.0,1.0));
}
}
l9_3428.y=l9_3444;
if (l9_3432)
{
bool l9_3449=l9_3434;
bool l9_3450;
if (l9_3449)
{
l9_3450=l9_3431.x==3;
}
else
{
l9_3450=l9_3449;
}
float l9_3451=l9_3428.x;
float l9_3452=l9_3433.x;
float l9_3453=l9_3433.z;
bool l9_3454=l9_3450;
float l9_3455=l9_3438;
float l9_3456=fast::clamp(l9_3451,l9_3452,l9_3453);
float l9_3457=step(abs(l9_3451-l9_3456),9.9999997e-06);
l9_3455*=(l9_3457+((1.0-float(l9_3454))*(1.0-l9_3457)));
l9_3451=l9_3456;
l9_3428.x=l9_3451;
l9_3438=l9_3455;
bool l9_3458=l9_3434;
bool l9_3459;
if (l9_3458)
{
l9_3459=l9_3431.y==3;
}
else
{
l9_3459=l9_3458;
}
float l9_3460=l9_3428.y;
float l9_3461=l9_3433.y;
float l9_3462=l9_3433.w;
bool l9_3463=l9_3459;
float l9_3464=l9_3438;
float l9_3465=fast::clamp(l9_3460,l9_3461,l9_3462);
float l9_3466=step(abs(l9_3460-l9_3465),9.9999997e-06);
l9_3464*=(l9_3466+((1.0-float(l9_3463))*(1.0-l9_3466)));
l9_3460=l9_3465;
l9_3428.y=l9_3460;
l9_3438=l9_3464;
}
float2 l9_3467=l9_3428;
bool l9_3468=l9_3429;
float3x3 l9_3469=l9_3430;
if (l9_3468)
{
l9_3467=float2((l9_3469*float3(l9_3467,1.0)).xy);
}
float2 l9_3470=l9_3467;
l9_3428=l9_3470;
float l9_3471=l9_3428.x;
int l9_3472=l9_3431.x;
bool l9_3473=l9_3437;
float l9_3474=l9_3438;
if ((l9_3472==0)||(l9_3472==3))
{
float l9_3475=l9_3471;
float l9_3476=0.0;
float l9_3477=1.0;
bool l9_3478=l9_3473;
float l9_3479=l9_3474;
float l9_3480=fast::clamp(l9_3475,l9_3476,l9_3477);
float l9_3481=step(abs(l9_3475-l9_3480),9.9999997e-06);
l9_3479*=(l9_3481+((1.0-float(l9_3478))*(1.0-l9_3481)));
l9_3475=l9_3480;
l9_3471=l9_3475;
l9_3474=l9_3479;
}
l9_3428.x=l9_3471;
l9_3438=l9_3474;
float l9_3482=l9_3428.y;
int l9_3483=l9_3431.y;
bool l9_3484=l9_3437;
float l9_3485=l9_3438;
if ((l9_3483==0)||(l9_3483==3))
{
float l9_3486=l9_3482;
float l9_3487=0.0;
float l9_3488=1.0;
bool l9_3489=l9_3484;
float l9_3490=l9_3485;
float l9_3491=fast::clamp(l9_3486,l9_3487,l9_3488);
float l9_3492=step(abs(l9_3486-l9_3491),9.9999997e-06);
l9_3490*=(l9_3492+((1.0-float(l9_3489))*(1.0-l9_3492)));
l9_3486=l9_3491;
l9_3482=l9_3486;
l9_3485=l9_3490;
}
l9_3428.y=l9_3482;
l9_3438=l9_3485;
float2 l9_3493=l9_3428;
int l9_3494=l9_3426;
int l9_3495=l9_3427;
float l9_3496=l9_3436;
float2 l9_3497=l9_3493;
int l9_3498=l9_3494;
int l9_3499=l9_3495;
float3 l9_3500=float3(0.0);
if (l9_3498==0)
{
l9_3500=float3(l9_3497,0.0);
}
else
{
if (l9_3498==1)
{
l9_3500=float3(l9_3497.x,(l9_3497.y*0.5)+(0.5-(float(l9_3499)*0.5)),0.0);
}
else
{
l9_3500=float3(l9_3497,float(l9_3499));
}
}
float3 l9_3501=l9_3500;
float3 l9_3502=l9_3501;
float4 l9_3503=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_3502.xy,bias(l9_3496));
float4 l9_3504=l9_3503;
if (l9_3434)
{
l9_3504=mix(l9_3435,l9_3504,float4(l9_3438));
}
float4 l9_3505=l9_3504;
l9_3419=l9_3505;
float l9_3506=0.0;
l9_3506=l9_3419.w;
float4 l9_3507=float4(0.0);
l9_3507.x=l9_3410;
l9_3507.y=l9_3411;
l9_3507.z=l9_3412;
l9_3507.w=l9_3506;
param_7=l9_3507;
param_9=param_7;
}
else
{
float4 l9_3508=float4(0.0);
l9_3508=float4((*sc_set0.UserUniforms).Port_Input_N006.x,(*sc_set0.UserUniforms).Port_Input_N006.y,(*sc_set0.UserUniforms).Port_Input_N006.z,(*sc_set0.UserUniforms).Port_Input_N006.w);
float l9_3509=0.0;
float l9_3510=0.0;
float l9_3511=0.0;
float4 l9_3512=l9_3508;
float l9_3513=l9_3512.x;
float l9_3514=l9_3512.y;
float l9_3515=l9_3512.z;
l9_3509=l9_3513;
l9_3510=l9_3514;
l9_3511=l9_3515;
float2 l9_3516=float2(0.0);
l9_3516=param_10.Surface_UVCoord0;
float2 l9_3517=float2(0.0);
l9_3517=((l9_3516-(*sc_set0.UserUniforms).Port_Center_N340)*(*sc_set0.UserUniforms).Port_Scale_N340)+(*sc_set0.UserUniforms).Port_Center_N340;
float4 l9_3518=float4(0.0);
int l9_3519;
if ((int(baseTexHasSwappedViews_tmp)!=0))
{
int l9_3520=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3520=0;
}
else
{
l9_3520=in.varStereoViewID;
}
int l9_3521=l9_3520;
l9_3519=1-l9_3521;
}
else
{
int l9_3522=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3522=0;
}
else
{
l9_3522=in.varStereoViewID;
}
int l9_3523=l9_3522;
l9_3519=l9_3523;
}
int l9_3524=l9_3519;
int l9_3525=baseTexLayout_tmp;
int l9_3526=l9_3524;
float2 l9_3527=l9_3517;
bool l9_3528=(int(SC_USE_UV_TRANSFORM_baseTex_tmp)!=0);
float3x3 l9_3529=(*sc_set0.UserUniforms).baseTexTransform;
int2 l9_3530=int2(SC_SOFTWARE_WRAP_MODE_U_baseTex_tmp,SC_SOFTWARE_WRAP_MODE_V_baseTex_tmp);
bool l9_3531=(int(SC_USE_UV_MIN_MAX_baseTex_tmp)!=0);
float4 l9_3532=(*sc_set0.UserUniforms).baseTexUvMinMax;
bool l9_3533=(int(SC_USE_CLAMP_TO_BORDER_baseTex_tmp)!=0);
float4 l9_3534=(*sc_set0.UserUniforms).baseTexBorderColor;
float l9_3535=0.0;
bool l9_3536=l9_3533&&(!l9_3531);
float l9_3537=1.0;
float l9_3538=l9_3527.x;
int l9_3539=l9_3530.x;
if (l9_3539==1)
{
l9_3538=fract(l9_3538);
}
else
{
if (l9_3539==2)
{
float l9_3540=fract(l9_3538);
float l9_3541=l9_3538-l9_3540;
float l9_3542=step(0.25,fract(l9_3541*0.5));
l9_3538=mix(l9_3540,1.0-l9_3540,fast::clamp(l9_3542,0.0,1.0));
}
}
l9_3527.x=l9_3538;
float l9_3543=l9_3527.y;
int l9_3544=l9_3530.y;
if (l9_3544==1)
{
l9_3543=fract(l9_3543);
}
else
{
if (l9_3544==2)
{
float l9_3545=fract(l9_3543);
float l9_3546=l9_3543-l9_3545;
float l9_3547=step(0.25,fract(l9_3546*0.5));
l9_3543=mix(l9_3545,1.0-l9_3545,fast::clamp(l9_3547,0.0,1.0));
}
}
l9_3527.y=l9_3543;
if (l9_3531)
{
bool l9_3548=l9_3533;
bool l9_3549;
if (l9_3548)
{
l9_3549=l9_3530.x==3;
}
else
{
l9_3549=l9_3548;
}
float l9_3550=l9_3527.x;
float l9_3551=l9_3532.x;
float l9_3552=l9_3532.z;
bool l9_3553=l9_3549;
float l9_3554=l9_3537;
float l9_3555=fast::clamp(l9_3550,l9_3551,l9_3552);
float l9_3556=step(abs(l9_3550-l9_3555),9.9999997e-06);
l9_3554*=(l9_3556+((1.0-float(l9_3553))*(1.0-l9_3556)));
l9_3550=l9_3555;
l9_3527.x=l9_3550;
l9_3537=l9_3554;
bool l9_3557=l9_3533;
bool l9_3558;
if (l9_3557)
{
l9_3558=l9_3530.y==3;
}
else
{
l9_3558=l9_3557;
}
float l9_3559=l9_3527.y;
float l9_3560=l9_3532.y;
float l9_3561=l9_3532.w;
bool l9_3562=l9_3558;
float l9_3563=l9_3537;
float l9_3564=fast::clamp(l9_3559,l9_3560,l9_3561);
float l9_3565=step(abs(l9_3559-l9_3564),9.9999997e-06);
l9_3563*=(l9_3565+((1.0-float(l9_3562))*(1.0-l9_3565)));
l9_3559=l9_3564;
l9_3527.y=l9_3559;
l9_3537=l9_3563;
}
float2 l9_3566=l9_3527;
bool l9_3567=l9_3528;
float3x3 l9_3568=l9_3529;
if (l9_3567)
{
l9_3566=float2((l9_3568*float3(l9_3566,1.0)).xy);
}
float2 l9_3569=l9_3566;
l9_3527=l9_3569;
float l9_3570=l9_3527.x;
int l9_3571=l9_3530.x;
bool l9_3572=l9_3536;
float l9_3573=l9_3537;
if ((l9_3571==0)||(l9_3571==3))
{
float l9_3574=l9_3570;
float l9_3575=0.0;
float l9_3576=1.0;
bool l9_3577=l9_3572;
float l9_3578=l9_3573;
float l9_3579=fast::clamp(l9_3574,l9_3575,l9_3576);
float l9_3580=step(abs(l9_3574-l9_3579),9.9999997e-06);
l9_3578*=(l9_3580+((1.0-float(l9_3577))*(1.0-l9_3580)));
l9_3574=l9_3579;
l9_3570=l9_3574;
l9_3573=l9_3578;
}
l9_3527.x=l9_3570;
l9_3537=l9_3573;
float l9_3581=l9_3527.y;
int l9_3582=l9_3530.y;
bool l9_3583=l9_3536;
float l9_3584=l9_3537;
if ((l9_3582==0)||(l9_3582==3))
{
float l9_3585=l9_3581;
float l9_3586=0.0;
float l9_3587=1.0;
bool l9_3588=l9_3583;
float l9_3589=l9_3584;
float l9_3590=fast::clamp(l9_3585,l9_3586,l9_3587);
float l9_3591=step(abs(l9_3585-l9_3590),9.9999997e-06);
l9_3589*=(l9_3591+((1.0-float(l9_3588))*(1.0-l9_3591)));
l9_3585=l9_3590;
l9_3581=l9_3585;
l9_3584=l9_3589;
}
l9_3527.y=l9_3581;
l9_3537=l9_3584;
float2 l9_3592=l9_3527;
int l9_3593=l9_3525;
int l9_3594=l9_3526;
float l9_3595=l9_3535;
float2 l9_3596=l9_3592;
int l9_3597=l9_3593;
int l9_3598=l9_3594;
float3 l9_3599=float3(0.0);
if (l9_3597==0)
{
l9_3599=float3(l9_3596,0.0);
}
else
{
if (l9_3597==1)
{
l9_3599=float3(l9_3596.x,(l9_3596.y*0.5)+(0.5-(float(l9_3598)*0.5)),0.0);
}
else
{
l9_3599=float3(l9_3596,float(l9_3598));
}
}
float3 l9_3600=l9_3599;
float3 l9_3601=l9_3600;
float4 l9_3602=sc_set0.baseTex.sample(sc_set0.baseTexSmpSC,l9_3601.xy,bias(l9_3595));
float4 l9_3603=l9_3602;
if (l9_3533)
{
l9_3603=mix(l9_3534,l9_3603,float4(l9_3537));
}
float4 l9_3604=l9_3603;
l9_3518=l9_3604;
float l9_3605=0.0;
l9_3605=l9_3518.w;
float4 l9_3606=float4(0.0);
l9_3606.x=l9_3509;
l9_3606.y=l9_3510;
l9_3606.z=l9_3511;
l9_3606.w=l9_3605;
param_8=l9_3606;
param_9=param_8;
}
Result_N5=param_9;
float4 Value_N355=float4(0.0);
Value_N355=Result_N5;
float Output_N357=0.0;
Output_N357=Value_N355.w;
float3 Output_N358=float3(0.0);
Output_N358=mix(Value_N353.xyz,Value_N355.xyz,float3(Output_N357));
float Output_N359=0.0;
Output_N359=Value_N353.w;
float Output_N360=0.0;
Output_N360=Output_N359+Output_N357;
float Output_N361=0.0;
Output_N361=fast::clamp(Output_N360+0.001,(*sc_set0.UserUniforms).Port_Input1_N361+0.001,(*sc_set0.UserUniforms).Port_Input2_N361+0.001)-0.001;
float4 Value_N362=float4(0.0);
Value_N362=float4(Output_N358.x,Output_N358.y,Output_N358.z,Value_N362.w);
Value_N362.w=Output_N361;
float4 Export_N363=float4(0.0);
Export_N363=Value_N362;
FinalColor=Export_N363;
float param_11=FinalColor.w;
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
if (param_11<(*sc_set0.UserUniforms).alphaTestThreshold)
{
discard_fragment();
}
}
if ((int(ENABLE_STIPPLE_PATTERN_TEST_tmp)!=0))
{
float4 l9_3607=gl_FragCoord;
float2 l9_3608=floor(mod(l9_3607.xy,float2(4.0)));
float l9_3609=(mod(dot(l9_3608,float2(4.0,1.0))*9.0,16.0)+1.0)/17.0;
if (param_11<l9_3609)
{
discard_fragment();
}
}
if ((*sc_set0.UserUniforms).sc_RayTracingCasterConfiguration.x!=0u)
{
float4 param_12=FinalColor;
if ((int(sc_RayTracingCasterForceOpaque_tmp)!=0))
{
param_12.w=1.0;
}
float4 l9_3610=fast::max(param_12,float4(0.0));
float4 param_13=l9_3610;
if (sc_ShaderCacheConstant_tmp!=0)
{
param_13.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.sc_FragData0=param_13;
return out;
}
float4 param_14=FinalColor;
if ((int(sc_ProjectiveShadowsCaster_tmp)!=0))
{
float4 l9_3611=param_14;
float4 l9_3612=l9_3611;
float l9_3613=1.0;
if ((((int(sc_BlendMode_Normal_tmp)!=0)||(int(sc_BlendMode_AlphaToCoverage_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaHardware_tmp)!=0))||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_3613=l9_3612.w;
}
else
{
if ((int(sc_BlendMode_PremultipliedAlpha_tmp)!=0))
{
l9_3613=fast::clamp(l9_3612.w*2.0,0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_3613=fast::clamp(dot(l9_3612.xyz,float3(l9_3612.w)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AlphaTest_tmp)!=0))
{
l9_3613=1.0;
}
else
{
if ((int(sc_BlendMode_Multiply_tmp)!=0))
{
l9_3613=(1.0-dot(l9_3612.xyz,float3(0.33333001)))*l9_3612.w;
}
else
{
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_3613=(1.0-fast::clamp(dot(l9_3612.xyz,float3(1.0)),0.0,1.0))*l9_3612.w;
}
else
{
if ((int(sc_BlendMode_ColoredGlass_tmp)!=0))
{
l9_3613=fast::clamp(dot(l9_3612.xyz,float3(1.0)),0.0,1.0)*l9_3612.w;
}
else
{
if ((int(sc_BlendMode_Add_tmp)!=0))
{
l9_3613=fast::clamp(dot(l9_3612.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_AddWithAlphaFactor_tmp)!=0))
{
l9_3613=fast::clamp(dot(l9_3612.xyz,float3(1.0)),0.0,1.0)*l9_3612.w;
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0))
{
l9_3613=dot(l9_3612.xyz,float3(0.33333001))*l9_3612.w;
}
else
{
if ((int(sc_BlendMode_Min_tmp)!=0))
{
l9_3613=1.0-fast::clamp(dot(l9_3612.xyz,float3(1.0)),0.0,1.0);
}
else
{
if ((int(sc_BlendMode_Max_tmp)!=0))
{
l9_3613=fast::clamp(dot(l9_3612.xyz,float3(1.0)),0.0,1.0);
}
}
}
}
}
}
}
}
}
}
}
}
float l9_3614=l9_3613;
float l9_3615=l9_3614;
float l9_3616=(*sc_set0.UserUniforms).sc_ShadowDensity*l9_3615;
float3 l9_3617=mix((*sc_set0.UserUniforms).sc_ShadowColor.xyz,(*sc_set0.UserUniforms).sc_ShadowColor.xyz*l9_3611.xyz,float3((*sc_set0.UserUniforms).sc_ShadowColor.w));
float4 l9_3618=float4(l9_3617.x,l9_3617.y,l9_3617.z,l9_3616);
param_14=l9_3618;
}
else
{
if ((int(sc_RenderAlphaToColor_tmp)!=0))
{
param_14=float4(param_14.w);
}
else
{
if ((int(sc_BlendMode_Custom_tmp)!=0))
{
float4 l9_3619=param_14;
float4 l9_3620=float4(0.0);
float4 l9_3621=float4(0.0);
if ((int(sc_FramebufferFetch_tmp)!=0))
{
float4 l9_3622=out.sc_FragData0;
l9_3621=l9_3622;
}
else
{
float4 l9_3623=gl_FragCoord;
float2 l9_3624=l9_3623.xy*(*sc_set0.UserUniforms).sc_CurrentRenderTargetDims.zw;
float2 l9_3625=l9_3624;
float2 l9_3626=float2(0.0);
if (sc_StereoRenderingMode_tmp==1)
{
int l9_3627=1;
int l9_3628=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3628=0;
}
else
{
l9_3628=in.varStereoViewID;
}
int l9_3629=l9_3628;
int l9_3630=l9_3629;
float3 l9_3631=float3(l9_3625,0.0);
int l9_3632=l9_3627;
int l9_3633=l9_3630;
if (l9_3632==1)
{
l9_3631.y=((2.0*l9_3631.y)+float(l9_3633))-1.0;
}
float2 l9_3634=l9_3631.xy;
l9_3626=l9_3634;
}
else
{
l9_3626=l9_3625;
}
float2 l9_3635=l9_3626;
float2 l9_3636=l9_3635;
float2 l9_3637=l9_3636;
float2 l9_3638=l9_3637;
float l9_3639=0.0;
int l9_3640;
if ((int(sc_ScreenTextureHasSwappedViews_tmp)!=0))
{
int l9_3641=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3641=0;
}
else
{
l9_3641=in.varStereoViewID;
}
int l9_3642=l9_3641;
l9_3640=1-l9_3642;
}
else
{
int l9_3643=0;
if (sc_StereoRenderingMode_tmp==0)
{
l9_3643=0;
}
else
{
l9_3643=in.varStereoViewID;
}
int l9_3644=l9_3643;
l9_3640=l9_3644;
}
int l9_3645=l9_3640;
float2 l9_3646=l9_3638;
int l9_3647=sc_ScreenTextureLayout_tmp;
int l9_3648=l9_3645;
float l9_3649=l9_3639;
float2 l9_3650=l9_3646;
int l9_3651=l9_3647;
int l9_3652=l9_3648;
float3 l9_3653=float3(0.0);
if (l9_3651==0)
{
l9_3653=float3(l9_3650,0.0);
}
else
{
if (l9_3651==1)
{
l9_3653=float3(l9_3650.x,(l9_3650.y*0.5)+(0.5-(float(l9_3652)*0.5)),0.0);
}
else
{
l9_3653=float3(l9_3650,float(l9_3652));
}
}
float3 l9_3654=l9_3653;
float3 l9_3655=l9_3654;
float4 l9_3656=sc_set0.sc_ScreenTexture.sample(sc_set0.sc_ScreenTextureSmpSC,l9_3655.xy,bias(l9_3649));
float4 l9_3657=l9_3656;
float4 l9_3658=l9_3657;
l9_3621=l9_3658;
}
float4 l9_3659=l9_3621;
float3 l9_3660=l9_3659.xyz;
float3 l9_3661=l9_3660;
float3 l9_3662=l9_3619.xyz;
float3 l9_3663=definedBlend(l9_3661,l9_3662,in.varStereoViewID,(*sc_set0.UserUniforms),sc_set0.intensityTexture,sc_set0.intensityTextureSmpSC);
l9_3620=float4(l9_3663.x,l9_3663.y,l9_3663.z,l9_3620.w);
float3 l9_3664=mix(l9_3660,l9_3620.xyz,float3(l9_3619.w));
l9_3620=float4(l9_3664.x,l9_3664.y,l9_3664.z,l9_3620.w);
l9_3620.w=1.0;
float4 l9_3665=l9_3620;
param_14=l9_3665;
}
else
{
if ((int(sc_Voxelization_tmp)!=0))
{
float4 l9_3666=float4(in.varScreenPos.xyz,1.0);
param_14=l9_3666;
}
else
{
if ((int(sc_OutputBounds_tmp)!=0))
{
float4 l9_3667=gl_FragCoord;
float l9_3668=fast::clamp(abs(l9_3667.z),0.0,1.0);
float4 l9_3669=float4(l9_3668,1.0-l9_3668,1.0,1.0);
param_14=l9_3669;
}
else
{
float4 l9_3670=param_14;
float4 l9_3671=float4(0.0);
if ((int(sc_BlendMode_MultiplyOriginal_tmp)!=0))
{
l9_3671=float4(mix(float3(1.0),l9_3670.xyz,float3(l9_3670.w)),l9_3670.w);
}
else
{
if ((int(sc_BlendMode_Screen_tmp)!=0)||(int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
float l9_3672=l9_3670.w;
if ((int(sc_BlendMode_PremultipliedAlphaAuto_tmp)!=0))
{
l9_3672=fast::clamp(l9_3672,0.0,1.0);
}
l9_3671=float4(l9_3670.xyz*l9_3672,l9_3672);
}
else
{
l9_3671=l9_3670;
}
}
float4 l9_3673=l9_3671;
param_14=l9_3673;
}
}
}
}
}
float4 l9_3674=param_14;
FinalColor=l9_3674;
if ((*sc_set0.UserUniforms).PreviewEnabled==1)
{
if (PreviewInfo.Saved)
{
FinalColor=float4(PreviewInfo.Color);
}
else
{
FinalColor=float4(0.0);
}
}
float4 l9_3675=float4(0.0);
l9_3675=float4(0.0);
float4 l9_3676=l9_3675;
float4 Cost=l9_3676;
if (Cost.w>0.0)
{
FinalColor=Cost;
}
FinalColor=fast::max(FinalColor,float4(0.0));
float4 param_15=FinalColor;
FinalColor=sc_OutputMotionVectorIfNeeded(param_15,in.varPosAndMotion,in.varNormalAndMotion);
float4 param_16=FinalColor;
float4 l9_3677=param_16;
if (sc_ShaderCacheConstant_tmp!=0)
{
l9_3677.x+=((*sc_set0.UserUniforms).sc_UniformConstants.x*float(sc_ShaderCacheConstant_tmp));
}
out.sc_FragData0=l9_3677;
return out;
}
} // FRAGMENT SHADER
