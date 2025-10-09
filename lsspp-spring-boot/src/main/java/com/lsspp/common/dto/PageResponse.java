package com.lsspp.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * 分页响应数据类
 *
 * 统一的分页数据格式，包含分页信息和数据列表
 *
 * @param <T> 数据类型
 * @author 六算盘开发团队
 * @version 1.0.0
 */
@Schema(description = "分页响应数据")
public class PageResponse<T> {

    @Schema(description = "数据列表")
    @JsonProperty("content")
    private List<T> content;

    @Schema(description = "当前页码（从0开始）", example = "0")
    @JsonProperty("page")
    private Integer page;

    @Schema(description = "每页大小", example = "10")
    @JsonProperty("size")
    private Integer size;

    @Schema(description = "总元素数量", example = "100")
    @JsonProperty("totalElements")
    private Long totalElements;

    @Schema(description = "总页数", example = "10")
    @JsonProperty("totalPages")
    private Integer totalPages;

    @Schema(description = "是否为第一页", example = "true")
    @JsonProperty("first")
    private Boolean first;

    @Schema(description = "是否为最后一页", example = "false")
    @JsonProperty("last")
    private Boolean last;

    @Schema(description = "是否有上一页", example = "false")
    @JsonProperty("hasPrevious")
    private Boolean hasPrevious;

    @Schema(description = "是否有下一页", example = "true")
    @JsonProperty("hasNext")
    private Boolean hasNext;

    @Schema(description = "当前页元素数量", example = "10")
    @JsonProperty("numberOfElements")
    private Integer numberOfElements;

    @Schema(description = "是否为空页", example = "false")
    @JsonProperty("empty")
    private Boolean empty;

    // 无参构造函数
    public PageResponse() {
    }

    // 全参构造函数
    public PageResponse(List<T> content, Integer page, Integer size, Long totalElements,
                       Integer totalPages, Boolean first, Boolean last, Boolean hasPrevious,
                       Boolean hasNext, Integer numberOfElements, Boolean empty) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.first = first;
        this.last = last;
        this.hasPrevious = hasPrevious;
        this.hasNext = hasNext;
        this.numberOfElements = numberOfElements;
        this.empty = empty;
    }


    /**
     * 创建空的分页响应
     */
    public static <T> PageResponse<T> empty() {
        return new PageResponse<>(
                List.of(),
                0,
                0,
                0L,
                0,
                true,
                true,
                false,
                false,
                0,
                true
        );
    }

    /**
     * 从数据列表创建简单的分页响应（用于不分页的情况）
     */
    public static <T> PageResponse<T> of(List<T> content) {
        int size = content.size();
        return new PageResponse<>(
                content,
                0,
                size,
                (long) size,
                size > 0 ? 1 : 0,
                true,
                true,
                false,
                false,
                size,
                content.isEmpty()
        );
    }

    // ========== Getter 和 Setter ==========

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Boolean getFirst() {
        return first;
    }

    public void setFirst(Boolean first) {
        this.first = first;
    }

    public Boolean getLast() {
        return last;
    }

    public void setLast(Boolean last) {
        this.last = last;
    }

    public Boolean getHasPrevious() {
        return hasPrevious;
    }

    public void setHasPrevious(Boolean hasPrevious) {
        this.hasPrevious = hasPrevious;
    }

    public Boolean getHasNext() {
        return hasNext;
    }

    public void setHasNext(Boolean hasNext) {
        this.hasNext = hasNext;
    }

    public Integer getNumberOfElements() {
        return numberOfElements;
    }

    public void setNumberOfElements(Integer numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    public Boolean getEmpty() {
        return empty;
    }

    public void setEmpty(Boolean empty) {
        this.empty = empty;
    }

    @Override
    public String toString() {
        return "PageResponse{" +
                "content=" + content +
                ", page=" + page +
                ", size=" + size +
                ", totalElements=" + totalElements +
                ", totalPages=" + totalPages +
                ", first=" + first +
                ", last=" + last +
                ", hasPrevious=" + hasPrevious +
                ", hasNext=" + hasNext +
                ", numberOfElements=" + numberOfElements +
                ", empty=" + empty +
                '}';
    }
}