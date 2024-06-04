#  HelloTriangle에서 추가 된 내용
![image](https://github.com/wonder21c/computer-graphic/assets/50861700/7cbd344d-f240-48d7-924f-af70fa5400ff)

```cpp
void D3D12HelloTriangle::PopulateCommandList()
{
    // Command list allocators can only be reset when the associated 
    // command lists have finished execution on the GPU; apps should use 
    // fences to determine GPU execution progress.
    ThrowIfFailed(m_commandAllocator->Reset());

    // However, when ExecuteCommandList() is called on a particular command 
    // list, that command list can then be reset at any time and must be before 
    // re-recording.
    ThrowIfFailed(m_commandList->Reset(m_commandAllocator.Get(), m_pipelineState.Get()));

    // Set necessary state.
    m_commandList->SetGraphicsRootSignature(m_rootSignature.Get());
    m_commandList->RSSetViewports(1, &m_viewport);
    m_commandList->RSSetScissorRects(1, &m_scissorRect);

    // Indicate that the back buffer will be used as a render target.
    m_commandList->ResourceBarrier(1, &CD3DX12_RESOURCE_BARRIER::Transition(m_renderTargets[m_frameIndex].Get(), D3D12_RESOURCE_STATE_PRESENT, D3D12_RESOURCE_STATE_RENDER_TARGET));

    CD3DX12_CPU_DESCRIPTOR_HANDLE rtvHandle(m_rtvHeap->GetCPUDescriptorHandleForHeapStart(), m_frameIndex, m_rtvDescriptorSize);
    m_commandList->OMSetRenderTargets(1, &rtvHandle, FALSE, nullptr);

    // Record commands.
    const float clearColor[] = { 0.0f, 0.2f, 0.4f, 1.0f };
    m_commandList->ClearRenderTargetView(rtvHandle, clearColor, 0, nullptr);
    m_commandList->IASetPrimitiveTopology(D3D_PRIMITIVE_TOPOLOGY_TRIANGLELIST);
    m_commandList->IASetVertexBuffers(0, 1, &m_vertexBufferView);
    m_commandList->DrawInstanced(3, 1, 0, 0);

    // Indicate that the back buffer will now be used to present.
    m_commandList->ResourceBarrier(1, &CD3DX12_RESOURCE_BARRIER::Transition(m_renderTargets[m_frameIndex].Get(), D3D12_RESOURCE_STATE_RENDER_TARGET, D3D12_RESOURCE_STATE_PRESENT));

    ThrowIfFailed(m_commandList->Close());
}

```



**- 명령 할당자 초기화 :**
```cpp
ThrowIfFailed(m_commandAllocator->Reset());
```

**- 명령 리스 초기화 :**
```cpp
ThrowIfFailed(m_commandList->Reset(m_commandAllocator.Get(), m_pipelineState.Get()));

```

**- 명령 할당자 초기화 :**
```cpp
ThrowIfFailed(m_commandAllocator->Reset());
```

**- 그래픽 루트 서명 설정 :**
```cpp
m_commandList->SetGraphicsRootSignature(m_rootSignature.Get());
```

**- 뷰포트 및 가위 사각형 설정 :**
```cpp
m_commandList->RSSetViewports(1, &m_viewport);
m_commandList->RSSetScissorRects(1, &m_scissorRect);
```
**- 리소스 배리어 설정 :**
```cpp
m_commandList->ResourceBarrier(1, &CD3DX12_RESOURCE_BARRIER::Transition(m_renderTargets[m_frameIndex].Get(), D3D12_RESOURCE_STATE_PRESENT, D3D12_RESOURCE_STATE_RENDER_TARGET));
```
**- 렌더 타겟 설정 :**
```cpp
CD3DX12_CPU_DESCRIPTOR_HANDLE rtvHandle(m_rtvHeap->GetCPUDescriptorHandleForHeapStart(), m_frameIndex, m_rtvDescriptorSize);
m_commandList->OMSetRenderTargets(1, &rtvHandle, FALSE, nullptr);
```
**- 렌더 타겟 클리어 :**
```cpp
const float clearColor[] = { 0.0f, 0.2f, 0.4f, 1.0f };
m_commandList->ClearRenderTargetView(rtvHandle, clearColor, 0, nullptr);
```
**- 프리미티브 토폴로지 및 버텍스 버퍼 설정 :**
```cpp
m_commandList->IASetPrimitiveTopology(D3D_PRIMITIVE_TOPOLOGY_TRIANGLELIST);
m_commandList->IASetVertexBuffers(0, 1, &m_vertexBufferView);
```
**- 명령 기록 및 인스턴스 드로우 호출 :**
```cpp
m_commandList->DrawInstanced(3, 1, 0, 0);
```

**- 리소스 배리어 설정 :**
```cpp
m_commandList->ResourceBarrier(1, &CD3DX12_RESOURCE_BARRIER::Transition(m_renderTargets[m_frameIndex].Get(), D3D12_RESOURCE_STATE_RENDER_TARGET, D3D12_RESOURCE_STATE_PRESENT));
```

**- 명령 리스트 닫기 :**
```cpp
ThrowIfFailed(m_commandList->Close());
```
**- ClearRenderTargetView():** 백 버퍼의 렌더 타겟 뷰를 지우는 데 사용됩니다. 이 함수를 사용하여 이전 프레임의 내용을 지우고 새 프레임을 그리기 전에 초기화합니다.*

**- IASetPrimitiveTopology():** 렌더링될 기본 토폴로지를 설정합니다. 여기서는 삼각형 리스트를 사용합니다.*

**- IASetVertexBuffers():** 버텍스 버퍼를 설정합니다. 삼각형을 그리기 위해 버텍스 데이터가 필요합니다.

**- DrawInstanced():** 그래픽 파이프라인에서 삼각형을 그립니다. 이 함수는 버텍스 버퍼에서 데이터를 읽어와 그래픽 파이프라인을 통해 삼각형을 렌더링합니다.

> 이렇게 함으로써 명령 리스트에 삼각형을 그리는 명령이 추가되고,렌더 타겟 뷰가 백 버퍼로 설정되어 삼각형을 렌더링을 함.

# HelloTexture에서 추가 된 내용
![image](https://github.com/wonder21c/computer-graphic/assets/50861700/c204602a-9524-4dfa-82f7-14334563c01f)

```cpp

{
    // Texture2D를 설명하고 생성합니다.
    D3D12_RESOURCE_DESC textureDesc = {};
    textureDesc.MipLevels = 1; // 밉맵 레벨 설정
    textureDesc.Format = DXGI_FORMAT_R8G8B8A8_UNORM; // 텍스처의 픽셀 형식 설정
    textureDesc.Width = TextureWidth; // 텍스처의 너비 설정
    textureDesc.Height = TextureHeight; // 텍스처의 높이 설정
    textureDesc.Flags = D3D12_RESOURCE_FLAG_NONE; // 추가 플래그 없음
    textureDesc.DepthOrArraySize = 1; // 깊이 또는 배열 크기 설정
    textureDesc.SampleDesc.Count = 1; // 멀티샘플링 카운트 설정
    textureDesc.SampleDesc.Quality = 0; // 멀티샘플링 품질 설정
    textureDesc.Dimension = D3D12_RESOURCE_DIMENSION_TEXTURE2D; // 자원의 차원 설정

    // 기본 힙에 텍스처 리소스를 생성합니다.
    ThrowIfFailed(m_device->CreateCommittedResource(
        &CD3DX12_HEAP_PROPERTIES(D3D12_HEAP_TYPE_DEFAULT),
        D3D12_HEAP_FLAG_NONE,
        &textureDesc,
        D3D12_RESOURCE_STATE_COPY_DEST, // 초기 리소스 상태 설정
        nullptr,
        IID_PPV_ARGS(&m_texture)));

    // 업로드 버퍼의 크기를 계산합니다.
    const UINT64 uploadBufferSize = GetRequiredIntermediateSize(m_texture.Get(), 0, 1);

    // GPU 업로드 버퍼를 생성합니다.
    ThrowIfFailed(m_device->CreateCommittedResource(
        &CD3DX12_HEAP_PROPERTIES(D3D12_HEAP_TYPE_UPLOAD),
        D3D12_HEAP_FLAG_NONE,
        &CD3DX12_RESOURCE_DESC::Buffer(uploadBufferSize),
        D3D12_RESOURCE_STATE_GENERIC_READ, // 업로드 버퍼의 초기 상태 설정
        nullptr,
        IID_PPV_ARGS(&textureUploadHeap)));

    // 중간 업로드 힙에 데이터를 복사하고, 업로드 힙에서 Texture2D로 복사를 예약합니다.
    std::vector<UINT8> texture = GenerateTextureData(); // 텍스처 데이터를 생성합니다.

    D3D12_SUBRESOURCE_DATA textureData = {};
    textureData.pData = &texture[0]; // 텍스처 데이터 시작 주소
    textureData.RowPitch = TextureWidth * TexturePixelSize; // 한 줄당 데이터 크기
    textureData.SlicePitch = textureData.RowPitch * TextureHeight; // 한 슬라이스당 데이터 크기

    // 업로드 버퍼의 데이터를 텍스처 리소스로 복사합니다.
    UpdateSubresources(m_commandList.Get(), m_texture.Get(), textureUploadHeap.Get(), 0, 0, 1, &textureData);

    // 텍스처 리소스의 상태를 픽셀 셰이더 리소스로 변경합니다.
    m_commandList->ResourceBarrier(1, &CD3DX12_RESOURCE_BARRIER::Transition(m_texture.Get(), D3D12_RESOURCE_STATE_COPY_DEST, D3D12_RESOURCE_STATE_PIXEL_SHADER_RESOURCE));

    // 텍스처에 대한 셰이더 리소스 뷰(SRV)를 설명하고 생성합니다.
    D3D12_SHADER_RESOURCE_VIEW_DESC srvDesc = {};
    srvDesc.Shader4ComponentMapping = D3D12_DEFAULT_SHADER_4_COMPONENT_MAPPING; // 셰이더 구성 요소 매핑 설정
    srvDesc.Format = textureDesc.Format; // SRV의 형식 설정
    srvDesc.ViewDimension = D3D12_SRV_DIMENSION_TEXTURE2D; // SRV의 차원 설정
    srvDesc.Texture2D.MipLevels = 1; // 밉맵 레벨 설정
    m_device->CreateShaderResourceView(m_texture.Get(), &srvDesc, m_srvHeap->GetCPUDescriptorHandleForHeapStart()); // SRV를 생성합니다.
}


```

**- 텍스처 설명 구조체 정의:** D3D12_RESOURCE_DESC   구조체를 사용하여 텍스처에 대한 설명을 정의합니다. 이는 텍스처의 속성을 지정하는 데 사용됩니다. 텍스처의 너비, 높이, 포맷, 사용 플래그 등이 여기에 포함됩니다.

**- 텍스처 생성:** CreateCommittedResource 함수를 사용하여 텍스처를 생성합니다. 이 함수는 GPU에 메모리를 할당하고 해당 메모리에 대한 뷰를 제공합니다.

**- 업로드 버퍼 생성:** 텍스처 데이터를 GPU로 업로드하기 위해 업로드 버퍼를 생성합니다. 업로드 버퍼는 임시로 CPU에서 GPU로 데이터를 전송하는 데 사용됩니다.

**- 텍스처 데이터 복사:** 생성된 텍스처와 업로드 버퍼 사이에 텍스처 데이터를 복사합니다. 이는 텍스처 데이터를 GPU 메모리로 이동시키는 과정입니다.

**- 텍스처 상태 전이:** ResourceBarrier 함수를 사용하여 텍스처의 상태를 변경합니다. 이를 통해 텍스처가 픽셀 셰이더 리소스로 사용될 수 있도록 상태를 변경합니다.

**- 쉐이더 리소스 뷰(SRV) 생성:** 텍스처를 픽셀 셰이더에서 사용할 수 있도록 쉐이더 리소스 뷰(SRV)를 생성합니다. 이를 통해 텍스처가 셰이더에서 읽을 수 있게 됩니다.

> 이러한 과정을 통해 텍스처가 성공적으로 생성되고 초기화되며, 그 후에는 셰이더에서 이를 사용하여 렌더링을 함.

# 소감
```
Direct3D라는 이름은 들어보긴 했지만, 직접 코드를 경험해본 것은 이번이 처음입니다. 처음 접했을 때는 낯설고 어려웠지만, 교수님의 친절하고 자세한 설명 덕분에 점차 Direct3D와 친해질 수 있었습니다.
특히, "helloTexture"와 "helloTriangle"에 관한 실습은 이론적인 부분뿐만 아니라 실제로 어떻게 적용되는지를 보여주며 큰 도움이 되었습니다.
 "helloTriangle" 실습을 통해 기본적인 삼각형을 그리는 방법을 배우며 Direct3D에서의 렌더링 과정에 대해 이해할 수 있었고,
 "helloTexture"에서는 텍스처를 어떻게 적용하는지 배우며 더 복잡한 시각적 효과를 만드는 방법을 익혔습니다.
이러한 과정들을 통해, 처음에는 어렵게만 느껴졌던 Direct3D가 점차 친숙해지며, 그래픽 프로그래밍에 대한 이해도 깊어졌다고 느낍니다.
 학습 과정에서 많은 도전이 있었지만,새로운 지식을 얻는 즐거움도 함께 느낄 수 있었습니다.
 앞으로 Direct3D를 더 깊이 공부하고, 이를 활용한 다양한 프로젝트에 도전해보고 싶습니다. 이번 학기 동안 Direct3D에 대한 두려움을 극복하고 더 자신감을 얻을 수 있었던 것은 교수님의 도움 덕분입니다.
이 경험을 바탕으로, 앞으로 더 많은 도전을 해나가고 싶습니다. 

```
